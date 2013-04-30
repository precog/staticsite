title: Labcoat Cloud 
author: Matthew De Goes 
date: 2013-03-26 12:20 
template: page-devcntr.jade

Developer Center

# QUIRREL

## introduction

Queries need to begin with loading some data using the double slash //
command. The next step is create a variable and assign the data to it using
the := assignment operator. Assigning the data into a variable will allow the
data to be more easily referenced (not having to call the load command of the
entire file path repeatedly).

Just loading the data then looks something like:
    
    //[path]/to/data    

And assigning it to a variable:

    data:= //[path]/to/data
    
Note that this query would result in an error. You haven't told Quirrel to
query anything, all you've done is assign data into a variable. You have not
called the variable. So, to see all of the data, you would then call:

    data

Paths can contain the following list of characters:

  * a-z A-Z _ - 0-9 . ~ : / ? # @ ! $ &amp; ' * + =

One basic operation is filtered descent with the . dot operator. Rather than
accessing all of the data, you can query a particular subset of the data,
which looks like:
    
    labcoatdata := //tutorial/transactions
    data.total    

To filter data use the where operator. This allows you to get the results of a
query limited to situations where some other condition is true. In this case,
the filter is for the source to be equal to "ad1".
    
    labcoatdata := //tutorial/transactions
    data.total where data.source = "ad1"
    
Filtering returns a more narrow subset of the data; in contrast, it is
possible to expand a dataset using the with operator. On the left of the with
operator is the original data set and on the right is an object that defines
the new variable(s) to include. You also typically want to store this in a new
variable. The example below creates an augmented dataset called dataWithHour
that contains an hour variable formed using a built-in time function:
std::time::hourOfDay. This new hour variable is then used as a filter in a
where statement.
    
    labcoatdata := //tutorial/transactions
    dataWithHour := data with {hour: std::time::hourOfDay(data.timeStamp)}
    dataWithHour.total where dataWithHour.hour &gt; 17

There are also a whole host of functions built into the standard library that
can be accessed using functionName(argumentsToBePassedToTheFunction). For
example, if you wanted to average the totals in the //tutorial/transaction
dataset:
    
    labcoatdata := //tutorial/transactions
    mean(data.total)    

You can use solve statements to call some function on all of the possible
values of a parameter for some set. In practice, this allows you to get the
results by each member of some set. For example, you might want to know the
sum of all sales by each source.    

    labcoatdata := //tutorial/transactions
    solve 'source
    {source: 'source, averageSales: mean(data.total where data.source = 'source)}

A solve statement always starts with solve and then some tic variable that
will be fed into into the object enclosed by curly braces "{}". Each comma
within the curly braces separates a new set that is named by what is on the
left of the colon ":" and defined by what is on the right on the colon.

This concludes a brief introduction to Quirrel. For additional information,
please see the resources below.

### quirrel website

[Quirrel Tutorial](http://quirrel-lang.org/tutorial.html)

[Quirrel Reference](http://quirrel-lang.org/reference.html)

### tutorials

[Quirrel Tutorial Videos](http://www.Precog.com/products/labcoat/learn)

