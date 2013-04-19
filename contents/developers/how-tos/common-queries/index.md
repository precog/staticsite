title: Labcoat Cloud
author: Matthew De Goes
date: 2013-03-26 12:20
template: page-devcntr.jade

<div id="body">
    <span class="page-title">Developer Center</span>
    <h1>How To</h1>
    <h2>Compute Common Analytics on Precog</h2>
    <h3>Introduction</h3>
    <p>This is a short guide that shows how to perform very common analytical queries using the Quirrel query language.</p>
    <p>Quirrel is a very powerful language that lets you perform much more advanced analytics and statistics than shown in this guide. For more information on how to write advanced Quirrel, please see the following resources:</p>
    <ul>
        <li><a href="http://www.precog.com/products/labcoat">The Quirrel Whitepaper</a></li>
        <li><a href="http://quirrel-lang.org/">Homepage for the Quirrel Language</a></li>
        <li><a href="irc://irc.freenode.net:6667/quirrel">The Quirrel IRC Channel</a></li>
        <li><a href="mailto:support@precog.com">support@precog.com</a></li>
    </ul>
    <p>All of these examples have been constructed so you can run them in the demo Labcoat environment, which you can access <a href="https://labcoat.precog.com">here</a>. By tweaking the names of the directories and field names, you should be able to easily run them on your own data, too.</p>
    <h3>How to compute a count</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>clicks := //clicks
 count(clicks)
</pre>
    <h3>How to compute a sum</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>conversions := //conversions
 
sum(conversions.product.price)
</pre>

    <h3>How to find the minimum, maximum, and average</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>product := (//conversions).product
 
  {min:    min(product.price),
 
  max:     max(product.price),
 
  average: mean(product.price)}
</pre>

    <h3>How to discard extreme values (outliers)</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>conversions := //conversions
 
average := mean(conversions.product.price)
 
bound := 3 * stdDev(conversions.product.price)
 
conversions where
 
 (conversions.product.price &gt; (average - bound)) &amp;
 
 (conversions.product.price &lt; (average + bound))
</pre>

    <h3>How to filter data</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>conversions := //conversions
 
conversions where
 
 (conversions.product.price &gt; 2) &amp;
 
 (conversions.customer.age &lt; 20)
</pre>

    <h3>How to sort data</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>import std::stats::rankNum
 
conversions := //conversions
 
conversions where
 
 rankNum(conversions.customer.age) &lt; 10
</pre>

    <h3>How to group data</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>conversions := //conversions
 
solve 'age, 'gender
 
 conversions' := conversions where
 
   conversions.customer.age = 'age &amp;
 
   conversions.customer.gender = 'gender
 
 {age: 'age, gender: 'gender, count: count(conversions')}
</pre>

    <h3>How to compute a histogram</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>london := //summer_games/london_medals
 
solve 'age
 
 london' := london where london.Age = 'age
 
 {age: 'age, count: count(london')}
</pre>

    <h3>How to compute a top-10 histogram</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>import std::stats::rank
 
london := //summer_games/london_medals
 
histogram := solve 'age
 
 london' := london where london.Age = 'age
 
 {age: 'age, count: count(london')}
 
ranked := histogram with {rank: rank(histogram.count)}
 
ranked where ranked.rank &lt; 10
</pre>

    <h3>How to compute a bottom-10 histogram</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>import std::stats::rank
 
london := //summer_games/london_medals
 
histogram := solve 'age
 
 london' := london where london.Age = 'age
 
 {age: 'age, count: count(london')}
 
ranked := histogram with {rank: rank(neg histogram.count)}
 
ranked where ranked.rank &lt; 10
</pre>

    <h3>How to parse dates and times</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>import std::time::parseDateTime
 
conversions := //conversions
 
parseDateTime(conversions.timeStamp, "yyyy-MM-ddThh:mm:ss.SSS")
</pre>

    <h3>How to fuzzily parse dates and times</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>import std::time::parseDateTimeFuzzy
 
conversions := //conversions
 
parseDateTimeFuzzy(conversions.timeStamp)
</pre>

    <h3>How to compute a day-by-day histogram</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>import std::time::date
 
conversions := //conversions
 
solve 'date
 
 conversions' := conversions where
 
   date(conversions.timeStamp) = 'date
 
 {count: count(conversions'), date: 'date}
</pre>

    <h3>How to compute a day-of-week histogram</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>import std::time::dayOfWeek
 
conversions := //conversions
 
solve 'dow
 
 conversions' := conversions where
 
   dayOfWeek(conversions.timeStamp) = 'dow
 
 {count: count(conversions'), dow: 'dow}
</pre>

    <h3>How to compute an hour-by-hour histogram</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>import std::time::dateHour
 
conversions := //conversions
 
solve 'dateHour
 
 conversions' := conversions where
 
   dateHour(conversions.timeStamp) = 'dateHour
 
 {count: count(conversions'), dateHour: 'dateHour}
</pre>

    <h3>How to compute an hour-of-day histogram</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>import std::time::hourOfDay
 
conversions := //conversions
 
solve 'hour
 
 conversions' := conversions.timeStamp where
 
   hourOfDay(conversions.timeStamp) = 'hour
 
 {count: count(conversions'), hour: 'hour}
</pre>

    <h3>How to join two different data sets</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>billing := //billing
 
conversions := //conversions
 
billing ~ conversions
 
{customerId: conversions.customer.ID,
 
billDate: billing.date} where
 
 conversions.customer.ID = billing.customer.ID
</pre>

    <h3>How to perform a time-windowed query</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>import std::time::hourOfDay
 
transactions := //tutorial/transactions
 
transactions' := transactions with {hourOfDay: hourOfDay(transactions.timeStamp)}
 
solve 'hour = transactions'.hourOfDay
 
 lowerBound := 'hour - 1
 
 upperBound := 'hour + 1
 
 window := transactions' where
 
   transactions'.hourOfDay &gt;= lowerBound &amp;
 
    transactions'.hourOfDay &lt;= upperBound
 
 {hour: 'hour, count: count(window)}
</pre>

    <h3>How to compute a cummulative total over time</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>import std::stats::rank
 
import std::time::date
 
transactions := //tutorial/transactions
 
transactions' := transactions with
 
 {order: rank(date(transactions.timeStamp)),
 
  day: date(transactions.timeStamp)}
 
solve 'day
 
 daysT := transactions' where transactions'.day = 'day
 
 dayOrder := min(daysT.order)
 
 {day: 'day,
 
  total: sum(transactions'.price where
 
               transactions'.order &lt;= dayOrder)}
</pre>

    <h3>How to find the duration between events</h3>
    <pre>
<a class="button-launch-labcoat" href="#">labcoat</a>import std::stats::denseRank
 
import std::time::getMillis
 
conversions := //conversions
 
solve 'customerId
 
   conversions' := conversions where
 
   conversions.customer.ID = 'customerId
 
 c1 := conversions' with
 
   {rank: denseRank(conversions.timeStamp),
 
    millis: getMillis(conversions.timeStamp)}
 
 c2 := new c1
 
 solve 'rank
 
   c1' := c1 where c1.rank = 'rank
 
   c2' := c2 where c2.rank - 1 = 'rank
 
   c1' ~ c2'
 
   {customerId: 'customerId,
 
    duration: c1'.millis - c2'.millis,
 
    price: c2'.product.price}
</pre>
</div>