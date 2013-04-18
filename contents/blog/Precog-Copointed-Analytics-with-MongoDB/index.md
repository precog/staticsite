title: Precog-Copointed Analytics with MongoDB
author: Derek Chen-Becker
date: 2012-12-18 00:00
template: post.jade

<p>Here at <a href="http://www.precog.com/">Precog</a>, our engineers have a wide variety of experience working with big data, statistical analysis, and database systems. We often get asked questions about our experiences with those systems, particularly relating to tips, tricks, and traps. One system that comes up pretty often is MongoDB, a NoSQL database that's widely used today for a number of reasons: it's easy to setup, it's performant, and it's a JSON document store that integrates well in the web tier. We like MongoDB a lot here at Precog. So much so that we've engineered <a href="mongodb">Precog for MongoDB</a>, a freely available product that allows the end-user to write sophisticated analytical queries in the <a href="http://quirrel-lang.org/">Quirrel language</a> utilizing an existing MongoDB instance as the backing store. Before we discuss Quirrel and Precog for MongoDB, let's take a look at the built-in support for analytical queries in MongoDB.</p>
<p>Mongo actually provides several methods for performing analytical queries, so let's start with the most basic and work our way up. For all of the examples in this query I'll be using our summer games data sets, downloadable from:</p>
<ul>
<li><a href="http://demo.precog.com/analytics/fs/?apiKey=5CDA81E8-9817-438A-A340-F34E578E86F8&amp;q=//summer_games/athletes">http://demo.precog.com/analytics/fs/?apiKey=5CDA81E8-9817-438A-A340-F34E578E86F8&amp;q=//summer_games/athletes</a></li>
<li><a href="http://demo.precog.com/analytics/fs/?apiKey=5CDA81E8-9817-438A-A340-F34E578E86F8&amp;q=//summer_games/london_medals">http://demo.precog.com/analytics/fs/?apiKey=5CDA81E8-9817-438A-A340-F34E578E86F8&amp;q=//summer_games/london_medals</a></li>
<li><a href="http://demo.precog.com/analytics/fs/?apiKey=5CDA81E8-9817-438A-A340-F34E578E86F8&amp;q=//summer_games/historic_medals">http://demo.precog.com/analytics/fs/?apiKey=5CDA81E8-9817-438A-A340-F34E578E86F8&amp;q=//summer_games/historic_medals</a></li>
</ul>
<p><strong>Basic Aggregation Tools</strong></p>
<p>Out of the box, Mongo's collections (roughly equivalent to a table in an RDBMS) have three methods for analytics. The first two, count and distinct, are fairly self-explanatory.</p>
<pre>&gt; use summer_games
switched to db summer_games
&gt; db.london_medals.count()
1019
&gt; db.london_medals.count({"Country":"Croatia"})
7
&gt; db.london_medals.distinct("Age group")
[
    "26 to 30",
    "31 to 40",
    "21 to 25",
    "20 and under",
    "Over 40",
    "31 to 35"
]</pre>
<p>The third operator that is exposed as a method on collections is group. Group is a bit more sophisticated in that it takes several JavaScript functions that perform the work of extracting data from input records, transforming that data, then aggregating and performing final transformations. Let's use the example of counting the number of athletes from each country, both male and female, to demonstrate the usage of group. For this query we'll use the athletes collection.</p>
<p>The group method on collections takes several parameters:</p>
<ul>
<li>key &#8211; a query-style JSON object defining which fields of the input documents will define the group keys</li>
<li>reduce &#8211; a JavaScript function that takes the current document and current results, aggregating the current document into those results and returning them</li>
<li>initial &#8211; the initial JSON results document (used once per group key)</li>
<li>keyf &#8211; a JavaScript function that can be used instead of the key param to calculate the group key</li>
<li>cond &#8211; a query-style JSON object that filters which documents in the collection should be grouped</li>
<li>finalize &#8211; a JavaScript function that is executed for each final result document before they're returned.</li>
</ul>
<p>For our example, we only need a key, reduce and initial parameter. To begin, we want to group by country, so we'll use a key that simply extracts the "Countryname" field:</p>
<pre>{ "Countryname" : 1 }</pre>
<p>Next, we want to count how many male and female athletes each country has, so our initial document will have zero counts for each:</p>
<pre>{ "male" : 0, "female" : 0 }</pre>
<p>Finally, our reduce function will increment the proper count on the result document based on whether the "Sex" field is "M" or not:</p>
<pre>function(current,total) { 
  if (current.Sex == "M") { 
    total.male += 1; 
  } else { 
    total.female += 1; 
  } 
}</pre>
<p>Putting these pieces together, we have:</p>
<pre>&gt; db.athletes.group({key: {"Countryname":1}, 
  reduce: function(current,total) { 
    if (current.Sex == "M") { total.male += 1; } else { total.female += 1; } 
  }, 
  initial: {"male":0,"female":0}})</pre>
<p>giving us:</p>
<pre>[
   {
   "Countryname" : "India",
    "male" : 60,
    "female" : 23
    },
    {
   "Countryname" : "Russia",
    "male" : 212,
    "female" : 229
    },
...</pre>
<p>As you can see, the results are returned as an array of documents according to our key and reduce parameters. While group can be a very flexible and powerful tool, it's important to note it has several limitations:</p>
<ol>
<li>It cannot be used on sharded collections (there are, however, alternatives)</li>
<li>The JavaScript interpreter in Mongo is currently single-threaded, meaning group will block other JavaScript evaluation while it runs</li>
<li>The result size is limited by the maximum BSON document size (currently 16MB), and is also limited to 20k entries (10k in versions prior to 2.2)</li>
</ol>
<p>While these limitations may prevent you from using the collection group method, its basic approach is essentially the same as the alternatives we'll discuss in the rest of this post.</p>
<p><strong>Map/Reduce</strong></p>
<p>The Map/Reduce framework in MongoDB (MR for short) is similar to the collection group method, but it provides more flexibility in output, as well as the ability to operate on sharded collections (and distribute computation between shards). Let's take a look at our example of counting athletes again. In our particular example we want the full collection, but it's possible to utilize a query-style document for both filtering and sorting of the initial input documents.</p>
<p>The first part of a MR query is the mapping function. The mapping function serves to both select the group key for aggregation as well as the actual values to be aggregated. Whereas in the collection group method we had a separate initial document and then a function that aggregated into that object, with MR each document can produce zero or more intermediate documents that are then aggregated in bulk. The primary work of the mapping function is to call emit() to generate the intermediate documents. For our example query, our mapping function looks like:</p>
<pre>function() {
if (this.Sex == "M")
    emit(this.Countryname, { "male" : 1, "female" : 0 });
else
    emit(this.Countryname, { "male" : 0, "female" : 1 });
}</pre>
<p>In the mapping function the "this" keyword is redefined to be the current document. One interesting thing to note is that emit may be called zero or more times per input document. For example, if we had a document property that was an array, we could iterate over it in the mapping function, emitting a new intermediate document for each element in the array. Similarly, if we wanted to prevent a particular document from contributing to the aggregate, we simply omit the call to emit.</p>
<p>Like the reduce parameter to collection grouping, the reduce function for MR performs the actual aggregation of data. Unlike the group method, the reduce function operates on chunks (arrays) of intermediate results. Additionally, the reduce function can be called multiple times on successive aggregation results, essentially using divide and conquer to aggregate the full results in multiple passes. Because of this behavior, the result of the reduce function must have the same structure as the intermediate documents. For our example, we need to sum up the totals of male and female counts for all inputs:</p>
<pre>function(key, values) {
var aggr = { "male" : 0, "female" : 0 };
for (var index in values) {
   aggr.male += values[index].male;
   aggr.female += values[index].female;
} return aggr;}</pre>
<p>Finally, MR needs to be told where to put the results of the aggregation. In addition to returning the result as an inline document like the group method (with the same size limitations), MR can also output its results to a collection using one of several modes:</p>
<ul>
<li>replace &#8211; Replace the contents of the collection with the new results</li>
<li>merge &#8211; merge the results into the existing collection, replacing any documents with the same group key</li>
<li>reduce &#8211; merge the results into the existing collection, running the reduce function on any new/old documents with the same key</li>
</ul>
<p>In particular, the reduce mode is very handy because it allows you to do incremental MR jobs on data that may change over time. You just need to utilize the query parameter to selected specific documents and avoid mapping/reducing the same input documents more than once. Our final MR call looks like:</p>
<pre>var mapF = function() {
if (this.Sex == "M")
    emit(this.Countryname, { "male" : 1, "female" : 0 });
else
   emit(this.Countryname, { "male" : 0, "female" : 1 });
}
var redF = function(key, values) {
var aggr = { "male" : 0, "female" : 0 };
for (var index in values) {
    aggr.male += values[index].male;
    aggr.female += values[index].female;
}
return aggr;
}
db.athletes.mapReduce(mapF, redF, { out : { inline : 1 }});</pre>
<p>In addition to the limitations on inline output documents, MR also carries the limitations of JavaScript evaluation; namely, that it's single-threaded in the current engine. However, in sharded environments, the mongos process will distribute the map/reduce jobs out to each shard so that they can run in parallel, which may significantly improve the runtime of large jobs when you have a sufficient number of shards (and good balancing of the data across those shards).</p>
<p><strong>The Aggregation Framework</strong></p>
<p>In an attempt to alleviate some of the performance issues related to JavaScript evaluation in Map/Reduce and group, 10Gen has developed a new aggregation framework in MongoDB that operates in a similar manner to Map/Reduce, but is coded entirely in native code. Most significantly, this removes the single-thread global lock for JavaScript evaluation, allowing for significant performance gains. These gains, however, come at the expense of some flexibility.</p>
<p>The aggregation framework works on "pipelines" of operations. The operations generally correspond to the parameters of a MR call with a few exceptions.</p>
<p>First, the query/filter functionality is handled by a $match operator. It takes a query-style document that is used to filter the initial input set. There are two query clauses that are expressly disallowed in $match queries:</p>
<ol>
<li>The $where clause, since this requires JavaScript evaluation</li>
<li>Geospatial queries, due to implementation details</li>
</ol>
<p>Otherwise any valid query clause can be used. It's important to note that if your $match clause is the first operation in the pipeline, it can utilize indices to improve performance, or in the case of covering indices, to provide the actual input data. If, say, we only wanted to aggregate for athletes from countries with less than 10M citizens, we could use:</p>
<pre>db.athletes.aggregate({ $match : { "Population" : { $lt : 10000000 } } })</pre>
<p>The next operation that's generally used in pipelines is $project. The $project operator fulfils the functionality of the mapping function in MR queries, allowing you to select, compute, or create fields in the intermediate documents. The group key for a given document is determined by the value of the "_id" field. Selection of fields is fairly straightforward, using similar syntax to existence queries by using a 1 or 0 to indicate retaining or discarding a given field:</p>
<pre>{ $project: { "Countryname" : 1 } }</pre>
<p>Unlike MR, you don't have JavaScript available, so instead 10Gen has provided a new set of operators for computation of new fields if desired. Unfortunately, since the document controlling $project has to be a JSON document, the computation operators are a bit clunky and can be difficult to read. For example, if we had a medical record database and wanted to compute the BMI (Body Mass Index, height / (weight * weight)), we would have to do:</p>
<pre>{ $project: {
 "bmi": { $divide : ["$weight", { $multiply : [ "$height", "$height" ] } ] } }
}</pre>
<p>Note that for arithmetic operators, the argument needs to be an array of two elements. Needless to say, this is one area that hopefully sees some improvement soon. Related to $project is $unwind, which can be used to flatten an array property into multiple documents (one for each value in the array). This is similar to how MR can call emit multiples times for array properties.</p>
<p>Another interesting aspect of $project (and $group, which we'll discuss shortly) is that the aggregation framework provides field references via special string syntax. If a property value is a string beginning with "$", the remainder of the value is used to reference the input document field of the same name. For example, because we want to group on the country name, we can set the value of "_id" via a reference:</p>
<pre>{ $project: { "_id" : "$Countryname" } }</pre>
<p>After matching and projecting our intermediate documents, we can finally aggregate them with the $group operator. The $group operator takes a JSON document that controls how each field in the inputs is computed. As with $project, the "_id" field is used to determine the grouping key. Unlike $project, "_id" is a required part of the grouping specification document. The $group operator has several different aggregations that can be performed:</p>
<ul>
<li>$sum, $min, $max, $avg &#8211; standard arithmetic ops</li>
<li>$addToSet, $push &#8211; set and array construction</li>
<li>String, boolean and date/time evaluation</li>
</ul>
<p>For our particular example, we want counts based on the value of the "Sex" field, so we use the $cond, $eq, and $sum operators:</p>
<pre>{ $group   : { "_id" : "$Countryname",
           "male"   : { $sum : { $cond : [{ $eq : ["M", "$Sex"]}, 1, 0] } },
          "female" : { $sum : { $cond : [{ $eq : ["F", "$Sex"]}, 1, 0] } } }}</pre>
<p>In addition to $match, $project, and $group, you can $sort intermediate and/or output results, and use $skip and $limit to provide pagination. For our example, our final aggregation pipeline looks like:</p>
<pre>db.athletes.aggregate(
{ $project : { "Countryname" : 1, "Sex" : 1 }},
{ $group   : { "_id" : "$Countryname",
           "male"   : { $sum : { $cond : [{ $eq : ["M", "$Sex"]}, 1, 0] } },
           "female" : { $sum : { $cond : [{ $eq : ["F", "$Sex"]}, 1, 0] } } }}
)</pre>
<p>While the aggregation framework is powerful in its own right, there are some limitations:</p>
<ul>
<li>Currently, the only output option for aggregation is inline documents. This means that</li>
<li>There is a 16MB limit on results</li>
<li>You cannot perform incremental aggregation</li>
<li>The computation operators for $project and $group, while covering many uses, don't have the full flexibility that JavaScript brings to MR</li>
<li>$group and $sort have to operate entirely in memory. There are no provisions for spilling to disk, so if you have large datasets you may not be able to process them with the aggregation framework</li>
</ul>
<p><strong>Precog for MongoDB</strong></p>
<p>As we've shown so far in this post, MongoDB's current analytics support is flexible and powerful. However, formulating queries using that support is not always easy. That's where Precog for MongoDB comes in. Precog for MongoDB is free version of the Precog analytics engine, designed to utilize an existing Mongo store for its data. With Precog for MongoDB you can perform sophisticated analytics using the Quirrel query language, a language custom designed for statistical analysis. Precog for MongoDB bundles both the analytics engine as well as a self-contained, self-hosted version of our Labcoat IDE so that you can jump right into developing queries within a user-friendly interface.</p>
<p>Before we get into the details of setup and running Precog for MongoDB, a disclaimer. Precog for MongoDB does not include the full Precog stack. Most significantly, while the Precog platform provides a flexible, capabilities-based authentication and authorization framework, Precog for MongoDB is restricted to using a single configurable API key that you provide. Similarly, Precog for MongoDB doesn't provide an ingest service, since data can be stored directly into Mongo. Lastly, due to technical limitations, we only recommend the product for exploratory data analysis. For developers interested in high-performance analytics on their MongoDB data, we recommend our cloud-based analytics solution and the MongoDB data importer, which can nicely complement existing MongoDB installations for analytic-intensive workloads.</p>
<p>We assume in these instructions that you already have a running Mongo instance with data. The first step is to download the Precog for MongoDB distribution, found at http://www.precog.com/mongodb. Once you have the zipped file, simply unzip it to a folder of your choice. Inside the folder is a configuration file called config.cfg. If your mongo instance is not at localhost:27017, you'll need to edit the configuration to point to the instance's host and port. Similarly, you can configure mongo authentication (see the README.md file for details), and change your apiKey from the default.</p>
<p>Once you've prepped everything, simply run the precog.sh (unix) or precog.bat (Windows) script and the analytics engine and embedded Labcoat will start. The default location for Labcoat is http://localhost:8000/. Once you have Labcoat up and running you can start working on queries for your data!</p>
<p>As a final example, the Quirrel query for our male/female participant count would be:</p>
<pre>data := //summer_games/athletes
solve 'country
  countryData := data where data.Countryname = 'country
 { country: 'country,
   male: count(countryData where countryData.Sex = ÔM'),
   female: count(countryData where countryData.Sex = ÔF') }</pre>
<p>For tutorials and other information on Quirrel, please visit <a href="https://www.precog.com/quirrel/introduction">https://www.precog.com/quirrel/introduction</a></p>