title: An Inside Look at the 12 Days of ReportGrid
author: Nathan Lubchenco
date: 2012-12-20 00:00
template: post.jade

<p>We recently launched <a href="http://www2.precog.com/12daysofreportgrid">The 12 Days of ReportGrid</a> to provide a fun overview of a sampling of embedded reporting options. In this post, we'll dig deeper into the technical details behind these beautiful, customizable visualizations. Here's the Sankey we'll be reproducing in a few short steps below:</p>
<p><strong>Data First</strong></p>
<p>Without data, there is nothing to visualize, so lets start at the source. For the Sankey visualization, we are looking at the flow of clicks to conversions broken apart by gender. You can run this query in the <a href="https://labcoat.precog.com/?q=clicks+%3A%3D+%2F%2Fclicks+%0Aconversions+%3A%3D+%2F%2Fconversions+%0A%0A%7Bhead%3A+%22male+clicks%22%2C+actions%3A+count%28clicks.timeStamp+where+clicks.customer.gender+%3D+%22male%22%29%2C+tail%3A+%22total+clicks%22%7D+union+%0A%7Bhead%3A+%22female+clicks%22%2C+actions%3A+count%28clicks.timeStamp+where+clicks.customer.gender+%3D+%22female%22%29%2C+tail%3A+%22total+clicks%22%7D+union+%0A%7Bhead%3A+%22male+conversions%22%2C+actions%3A+count%28conversions.timeStamp+where+conversions.customer.gender+%3D+%22male%22%29%2C+tail%3A+%22male+clicks%22%7D+union+%0A%7Bhead%3A+%22female+conversions%22%2C+actions%3A+count%28conversions.timeStamp+where+conversions.customer.gender+%3D+%22female%22%29%2C+tail%3A%22female+clicks%22%7D">demo version of Labcoat</a>. The basic idea is to begin by loading some clicks and conversions data. Then we union together the four objects we need for the visualization. Each object needs a label for the head and the tail so that the Sankey can determine how the data is related. The "head" is the where the data is going and the "tail" is where the data came from. So for example, in the first object, the "total clicks" is the tail that breaks into the smaller head of "male clicks". The size of each node comes from the max of the sum of every tail and the sum of every head, but this default can be overridden to provide flexibility for situations in which you want to set the size of a node to an exact measurement. Note that the second object has the same tail and a different head. In addition to these structural labels, each object also contains an appropriate count.</p>
<pre>clicks := //clicks
conversions := //conversions

{head: "male clicks", actions: count(clicks.timeStamp where 
clicks.customer.gender = "male"), tail: "total clicks"} union
{head: "female clicks", actions: count(clicks.timeStamp where 
clicks.customer.gender = "female"), tail: "total clicks"} union
{head: "male conversions", actions: count(conversions.timeStamp where 
conversions.customer.gender = "male"), tail: "male clicks"} union
{head: "female conversions", actions: count(conversions.timeStamp where 
conversions.customer.gender = "female"),  tail:"female clicks"}</pre>
<p><strong>Easy Integration</strong></p>
<p>Once we have a query that returns results we are interested in displaying, we can export the code and integrate it into HTML The download code option in labcoat (the downward pointing arrow in the query editor) provides numerous options for downloading queries (including an HTML template if desired). Note that the javascript option will automatically insert escape characters as needed. For example,</p>
<pre>head: "male clicks"</pre>
<p>becomes transformed into:</p>
<pre>head: \"male clicks\"</pre>
<p>This query can then be assigned into a variable and used in a query to power a ReportGrid visualization. Check out this gist to see the code. Lines 5-7 load the ReportGrid visualization library, along with its default styling options and the Precog JavaScript client library with a read-only API key. Lines 11 to 26 call the ReportGrid.sankey() function, with straightforward parameters.</p>
<p>That's all you need to have an informative and insightful visualization embedded in your application. At a glance you can tell that male customers click at a significantly higher rate, but the conversion rates are quite similar.</p>
<p>Check out the other visualizations used in the <a href="http://www2.precog.com/12daysofreportgrid">12 days of ReportGrid</a> or see examples of the entire <a href="http://www.precog.com/products/reportgrid">ReportGrid Visualization library!</a> For a more complete explanation of how to use Precog and ReportGrid to create embedded reporting, check out this <a href="http://www.precog.com/how-tos/embed-reporting">How To guide</a>.</p>