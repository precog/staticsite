title: Labcoat Cloud 
author: Matthew De Goes 
date: 2013-03-26 12:20 
template: page-devcntr.jade

## Introduction

Quirrel is a simple but powerful query language designed for performing analytics 
on JSON data. Quirrel is the primary interface to the Precog analytics engine.

Quirrel can handle the full range of JSON (actually, a strict 
superset of JSON), and can perform everything from simple rollups and
time series queries, to much more advanced statistics and machine learning.

In addition, Quirrel gracefully handles heterogeneous data and allows you
to gradually refine the structure of your data inside a query.

This article provides a fast introduction to Quirrel. See the references
at the end for more information.

### Literal Values

Quirrel supports all of JSON, so you can create literal JSON values in Quirrel.

For example:

    {"gender": "female", "age": 42, "interests": ["weightlifting", "rowing"]}
    
or:

    [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    
### Expressions

You can create numerical and boolean expressions using familiar operators like * (multiplication),
/ (division), + (addition), ^ (exponentiation), - (subtraction), & (boolean AND), | (boolean OR),
! (boolean NOT), and many more.

For example:

    2 * 2 ^ 3 + 4 - 3
    
or:

    true | (!false & true) & !false

### Loading Data

Queries need to begin with loading some data. You can use the *load()* function,
or the absolute path load operator, represented by two forward slashes (//).

For example:

    //path/to/data

or:

    load("/path/to/data")

### Assignment

Often times, you will want to store the data inside a variable. To do this, just
use the assignment operator (*:=*). Assigning a variable to the data will 
allow you to more easily reference the data, without having to call one of
the load commands each time.

For example:
    
    data := //path/to/data
    
If you try to run this query, you'll get an error, because the query doesn't return
anything. It just loads some data and stores it into a variable.

If you wanted to retrieve the whole data set, you could run the following query:

    data := //path/to/data
    data

### Object Drilldown

One basic operation is the object drilldown operator (*.*). This lets you
look at a particular field of a JSON object.

For example, the following query extracts out the *total*'s stored inside
a bunch of transaction objects:
    
    data := //tutorial/transactions
    data.total    

### Filtering Data

To filter data, use the *where* operator. This operators lets you filter the 
values in a set by some boolean (true/false) predicate.

For example, the following query looks at *total*'s where the data source
is "ad1":
    
    data := //tutorial/transactions
    data.total where data.source = "ad1"

### Augmentation
    
You can add fields to objects using the *with* operator.

On the left of the *with* operator is the original data set. On the right is an
object that defines new fields to include in the merged set.

The example below creates an augmented dataset called *dataWithHour*,
which contains an *hour* variable formed using a built-in time function 
(*std::time::hourOfDay*). This new variable is then used as a filter in a
where statement.
    
    import std::time::*
    
    data := //tutorial/transactions
    dataWithHour := data with {hour: hourOfDay(data.timeStamp)}
    dataWithHour.total where dataWithHour.hour &gt; 17

### Standard Library

There are a bunch of useful functions built into the Quirrel standard library.

You can use these functions using the syntax, *f(args)*, where *f* is the function
name, and *args* are the inputs to the function.

For example, if you wanted to average the totals in the *//tutorial/transaction*:
    
    data := //tutorial/transactions
    mean(data.total)
    
### Grouping

The *solve* construct allows you to perform very powerful grouping operations.

In the *solve* construct, Quirrel identifies solutions for a set of variables
(called *tic variables*), and evaluates an expression for each solution. The
results are then merged together in a single set.

Take the following example:

    data := //tutorial/transactions
    solve 'source
      {source: 'source, averageSales: mean(data.total where data.source = 'source)}

In this example, Quirrel solves for *'source*, identifying all solutions. For each *'source*
solution, it then evaluates the body of the solve (to yield the mean for the given source), 
and merges the results together into a single set, which is the output of the query.

## Quirrel Standard

  * [Quirrel Tutorial](http://quirrel-lang.org/tutorial.html)
  * [Quirrel Reference](http://quirrel-lang.org/reference.html)

## Learning Quirrel

  * [How to Perform Common Analytics on Precog](/developers/how-tos/common-analytics/)
  * [Quirrel Game](http://www2.precog.com/learn-quirrel-level-1)
  * [Quirrel Tutorial Videos](http://www.youtube.com/user/PrecogPlatform)
  * [Quirrel IRC Channel](irc://irc.freenode.net:6667/quirrel)
  * [Support Forum](https://support.precog.com)
  * [support@precog.com](mailto:support@precog.com)

  

