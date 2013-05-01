title: How to Optimize Query Performance on Precog
author: Matthew De Goes 
date: 2013-03-26 12:20 
template: page-devcntr.jade

Developer Center

# How To

## Optimizing Query Performance with Precog

If you are deploying a production application that uses Precog, you may be
interested in ways to optimize the runtime query performance.

In this document, you can find our recommended tips to maximizing runtime
performance on Precog.

### 1. Partition data by path

Precog partitions all data by its location in the file system. Data stored in
one path does not degrade the performance of queries on other paths.

Precog makes it easy to analyze data even when the data is stored across
different paths. So you should freely partition your data into different
paths. The less data is located in any one path, the faster it will be to run
queries across that path.

### 2. Specify columns

Precog is a columnar database, which means that all data from the same column
is stored together. For typical analytical queries that only involve one or a
few columns, this results in a dramatic reduction in IO, which improves
performance.

To maximize performance, when you perform a query across a data set, you
should always specify the columns you are interested in.

For example, you might be interested in counting all the data from a set foo.

If you write count(foo), Precog will have to load all the columns that make up
the values of foo. However, if you write, count(foo.bar), then Precog only has
to load the bar column of the data, which will be tremendously faster.

Compare the following two queries:

[clicks := //clicks count(clicks.product.price)](https://labcoat.precog.com/?q
=clicks+%3A%3D+%2F%2Fclicks%0Acount(clicks.product.price))

[clicks := //clicks count(clicks)](https://labcoat.precog.com/?q=clicks+%3A%3D
+%2F%2Fclicks%0Acount(clicks))

The first query completes 10 times faster than the second query, because it
only has to load a fraction of the data that the second query has to load.

### 3. Pull up filters

If you are going to filter data at some point, it makes sense to filter it
before performing any computationally expensive operations on it. For example,
queries will generally complete faster if filtering is done before a solve
statement rather than after.

### 4. Push down relates

The relate operator results in Cartesian cross product on the sets being
related. Therefore, moving the relate operator as far down into a query as
possible will increase performance.

Ideally, sets being related are always small, such that the results can be
computed rapidly.

### 5. When all else fails

If you encounter a slow running query that you cannot optimize, [please let us
know](https://precog.com/contact) and we'll look into it.

