title: Common Analytics
author: Matthew De Goes 
date: 2013-03-26 12:20 
template: page-devcntr.jade

## How to Perform Common Analytics on Precog

### Introduction

This is a short guide that shows how to perform very common analytics
using the Quirrel query language.

Quirrel is a very powerful language that lets you perform much more advanced
analytics and statistics than shown in this guide. For more information on how
to write advanced Quirrel, please see the following resources:

  * [Quirrel Tutorial](http://quirrel-lang.org/tutorial.html)
  * [Quirrel Reference](http://quirrel-lang.org/reference.html)
  * [How to Perform Common Analytics on Precog](/developers/how-tos/common-analytics/)
  * [Quirrel Game](http://www2.precog.com/learn-quirrel-level-1)
  * [Quirrel Tutorial Videos](http://www.youtube.com/user/PrecogPlatform)
  * [Quirrel IRC Channel](irc://irc.freenode.net:6667/quirrel)
  * [Support Forum](https://support.precog.com)
  * [support@precog.com](mailto:support@precog.com)

All of these examples have been constructed so you can run them in the demo
Labcoat environment, which you can access [here](https://labcoat.precog.com).

By tweaking the names of the directories and field names, you should be able
to easily run versions of these queries on your own data, too.

### How to compute a count

    clicks := //clicks
    count(clicks)

### How to compute a sum

    conversions := //conversions
     
    sum(conversions.product.price)    

### How to find the minimum, maximum, and average

    product := (//conversions).product
     
      {min:    min(product.price),
     
      max:     max(product.price),
     
      average: mean(product.price)}
    

### How to discard extreme values (outliers)

    conversions := //conversions
     
    average := mean(conversions.product.price)
     
    bound := 3 * stdDev(conversions.product.price)
     
    conversions where
     
     (conversions.product.price &gt; (average - bound)) &amp;
     
     (conversions.product.price &lt; (average + bound))
    

### How to filter data

    conversions := //conversions
     
    conversions where
     
     (conversions.product.price &gt; 2) &amp;
     
     (conversions.customer.age &lt; 20)
    

### How to sort data

    import std::stats::rankNum
     
    conversions := //conversions
     
    conversions where
     
     rankNum(conversions.customer.age) &lt; 10
    

### How to group data

    conversions := //conversions
     
    solve 'age, 'gender
     
     conversions' := conversions where
     
       conversions.customer.age = 'age &amp;
     
       conversions.customer.gender = 'gender
     
     {age: 'age, gender: 'gender, count: count(conversions')}
    

### How to compute a histogram

    london := //summer_games/london_medals
     
    solve 'age
     
     london' := london where london.Age = 'age
     
     {age: 'age, count: count(london')}
    

### How to compute a top-10 histogram

    import std::stats::rank
     
    london := //summer_games/london_medals
     
    histogram := solve 'age
     
     london' := london where london.Age = 'age
     
     {age: 'age, count: count(london')}
     
    ranked := histogram with {rank: rank(histogram.count)}
     
    ranked where ranked.rank &lt; 10
    

### How to compute a bottom-10 histogram

    import std::stats::rank
     
    london := //summer_games/london_medals
     
    histogram := solve 'age
     
     london' := london where london.Age = 'age
     
     {age: 'age, count: count(london')}
     
    ranked := histogram with {rank: rank(neg histogram.count)}
     
    ranked where ranked.rank &lt; 10
    

### How to parse dates and times

    import std::time::parseDateTime
     
    conversions := //conversions
     
    parseDateTime(conversions.timeStamp, "yyyy-MM-ddThh:mm:ss.SSS")
    

### How to fuzzily parse dates and times

    import std::time::parseDateTimeFuzzy
     
    conversions := //conversions
     
    parseDateTimeFuzzy(conversions.timeStamp)
    

### How to compute a day-by-day histogram

    import std::time::date
     
    conversions := //conversions
     
    solve 'date
     
     conversions' := conversions where
     
       date(conversions.timeStamp) = 'date
     
     {count: count(conversions'), date: 'date}
    

### How to compute a day-of-week histogram

    import std::time::dayOfWeek
     
    conversions := //conversions
     
    solve 'dow
     
     conversions' := conversions where
     
       dayOfWeek(conversions.timeStamp) = 'dow
     
     {count: count(conversions'), dow: 'dow}
    

### How to compute an hour-by-hour histogram

    import std::time::dateHour
     
    conversions := //conversions
     
    solve 'dateHour
     
     conversions' := conversions where
     
       dateHour(conversions.timeStamp) = 'dateHour
     
     {count: count(conversions'), dateHour: 'dateHour}
    

### How to compute an hour-of-day histogram

    import std::time::hourOfDay
     
    conversions := //conversions
     
    solve 'hour
     
     conversions' := conversions.timeStamp where
     
       hourOfDay(conversions.timeStamp) = 'hour
     
     {count: count(conversions'), hour: 'hour}
    

### How to join two different data sets

    billing := //billing
     
    conversions := //conversions
     
    billing ~ conversions
     
    {customerId: conversions.customer.ID,
     
    billDate: billing.date} where
     
     conversions.customer.ID = billing.customer.ID
    

### How to perform a time-windowed query

    import std::time::hourOfDay
     
    transactions := //tutorial/transactions
     
    transactions' := transactions with {hourOfDay: hourOfDay(transactions.timeStamp)}
     
    solve 'hour = transactions'.hourOfDay
     
     lowerBound := 'hour - 1
     
     upperBound := 'hour + 1
     
     window := transactions' where
     
       transactions'.hourOfDay &gt;= lowerBound &amp;
     
        transactions'.hourOfDay &lt;= upperBound
     
     {hour: 'hour, count: count(window)}
    

### How to compute a cumulative total over time

    import std::stats::rank
     
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
    

### How to find the duration between events

    import std::stats::denseRank
     
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
