title: Example Labcoat Query- Cumulative Conversions
author: Nathan Lubchenco
date: 2013-01-02 00:00
template: post.jade

<p>We want to make the transition to Precog as easy as possible for our customers and so our support team has provided some initial queries to help get started. These queries make it extremely fast to get an application up and running and gives customers example queries that they can modify moving forward. Let's examine an example query, which includes data from the demo version of Labcoat.</p>
<p>In <a href="http://quirrel-lang.org/">Quirrel</a>, it's easy to do an aggregation by some time period such as day, week or month.  But sometimes we want this aggregation to include not just the results of that week, but the cumulative results of all prior weeks.  Below is a screenshot from Labcoat displaying cumulative conversions.</p>
<p><img alt="" src="https://lh3.googleusercontent.com/lvSms2-XzlHTKGlckNnQFg0wxO_6EZH6ZxOCRRIQffYKKUzFUihKNApnYwl6olgXvKUoU7ln5SvafB_7nqSSO1bEHuGvQeU3AfZ0PPOnOKpKD0rkWpc" width="709" height="178" /></p>
<p>Let's walk through the Quirrel needed to produce this result.  First, import the standard library time module so that we can use the weekOfYear function. Then, augment the initial data with a variable called week by using the with command.</p>
<p>Finally, write a solve statement with an explicit constraint.  Explicit constraints for solve statements are declared in the first line of a solve after an "=" equals sign.  This differs from many solve statements that have implicit constraints from where clauses within the body of the solve.  Constraints determine where the values for a tic variable ('week in this case) come from.  So in the example below, the body of the solve statement will be computed for each value of conversions'.week. Explicit constraints are needed for a cumulative query because the inequality needed in the body of the solve statement prevents the where clause from serving as an implicit constraint.</p>
<pre>import std::time::*

conversions := //conversions
conversions' := conversions with { week: weekOfYear(conversions.timeStamp) }

solve 'week = conversions'.week
{
week: 'week,
cumulativeConversions: count(conversions'.week where conversions'.week &lt;= 'week)
}</pre>
<p>You can <a href="https://labcoat.precog.com/?q=import+std%3A%3Atime%3A%3A%0A%0Aconversions+%3A%3D+%2F%2Fconversions%0Aconversions%27+%3A%3D+conversions+with+%7B+week%3A+weekOfYear%28conversions.%0AtimeStamp%29+%7D%0A%0Asolve+%27week+%3D+conversions%27.week%0A+%7B%0A+week%3A+%27week%2C%0A+cumulativeConversions%3A+count%28conversions%27.week+where+conversions%27.week+%3C%3D+%27week%29%0A+%7D">try this query</a> in Labcoat for yourself.</p>
<p>If you need help with a query, just <a href="http://support.precog.com/">let us know</a> and we'll be happy to help!</p>