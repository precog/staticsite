title: Getting Started
author: Matthew De Goes 
date: 2013-03-26 12:20 
template: page-devcntr.jade

Developer Center

# GETTING STARTED

## SIGN UP: API KEYS, PATHS

Please visit the [Registration Page](http://Precog.com/account/login/) to sign
up for an account. When you signup, you'll get an API key and a root path.
This information is accessible from your [account
page](http://www.Precog.com/account).

Your API key allows you to interact with the Precog API. The API key can be
thought of as a combination of a username and a password. The root path is
where all of your data lives inside the Precog file system.

Your API is initially given grants to read and write all data inside your root
path. Over time, other Precog users may give you additional grants to read and
write data elsewhere in the file system.

Your API key is tied to your Precog account. Any data you write to your root
path is automatically "owned" by your Precog account. This means no one can
see it unless you give them permission to see it. Precog is secure by default.

### AUTHORSHIP

Accounts are used to identify authorship of data. Your accountId is the same
as your root path. Whenever you use an API key to store data in Precog, the
account associated with the relevant API key's write grant is marked as the
author of that data.

Data authorship is tracked very aggressively in Precog so that no one can see
data unless the author of the data has given them permission to see it.

### GRANTS

Precog currently supports the following kinds of grants:

  * **Read** - This grant lets you read any data in a path that is owned by a particular account. The read grant also implies the capabilities of the reduce grant.
  * **Reduce** - This grant lets you read reductions of any data in a path that is owned by a particular account (for example, counting the values or doing other operations that reduce the original data set).
  * **Write** - This grant lets you insert new data in a path that will be owned by a particular account.
  * **Delete** - This grant lets you delete any data in a path that is owned by a particular account.
  * **Owner** - This grant gives you "ownership" of a directory. Ownership means you can delete or move data inside the directory, even if you don't own that data.

Notice how all grants except **owner** are tied to a specific account. No
grant can confer the ability to read, write, reduce, or delete data across all
accounts -- that would not be secure, and Precog takes security very
seriously.

If you have a grant, you can use that grant to create another grant which is
either less powerful than the original grant, or just as powerful as the
original grant.

For example, if you have a read grant to a path called /foo/, then you can use
that read grant to create another read grant for /foo/bar/ (which is strictly
less powerful than the original grant). Or if you have a write grant for /foo/
that does not expire, you could use that write grant to create another write
grant for /foo/ that expires in two days. If you use a first grant to create a
second grant, then you can revoke the second grant at any time. Additionally,
if your grant is revoked, then all derived grants are revoked automatically.

### ROOT PATH

When you create an account, you are assigned a unique root path. This root
path will be the same as your accountId. Your API key gives you permission to
read, write, and delete the data in the root path.

Your root path is required by the API to access your data; it will need to be
inserted in API calls or the URL to access Labcoat (an interactive development
environment for analyzing data).

In the documentation below, remember to replace [path] with your root path and
any required subpaths: rootpath/path/to/data.

### FILE SYSTEM

Precog uses the metaphor of a file system to help you organize and share data.
Any time you store data in Precog, you must choose a directory to store the
data in. You don't have to create directories manually. Directories are
created on-demand whenever you try to put data in a directory that doesn't
exist yet.

Precog doesn't support the notion of "databases" or "tables" or "collections".
Instead, you can use the file system to create however many levels of
organization make sense to you. The file system forms the basis of the
security model because grants are given to a specific path. So the decision of
how to organize your data is not completely arbitrary (unless you have no
intention of sharing access to your data). The file system and associated
security model make Precog multi-tenant out of the box.

Technically, Precog supports hierarchical multi-tenancy, which is the most
sophisticated kind of multi-tenancy available. Your customers can have
customers, who in turn can have customers, for any number of levels deep, each
with rigorously defined and enforced permissions.

Some common use cases may help illustrate. An advertising company might
structure its data like this:

    
    
    /companyname/customerID/campaignID/web/cpm
    /companyname/customerID/campaignID/mobile/impressions
    /companyname/customerID/campaignID/mobile/clicks
    etc.
        

An e-commerce platform might structure its data like this:

    
    
    /platformname/clientcompany/transactions
    /platformname/clientcompany/checkouts
    /platformname/clientcompany/products
    etc.
        

Each event stored is typically a [JSON](http://www.json.org/) object. A JSON
object is an unordered set of name/value pairs. For example:

    
    
    { "age:" 36,"customerID": "0019327","status": "active" }
        

Note that it is important that numeric values not be surrounded by quotes or
they will be interpreted as strings and not as numeric values. It is generally
preferable to store data as JSON objects even if the data is just a value or
even an array. For example:

    
    
    {"age": 19}
        

is preferable to:

    
    
    19
        

Similiarly, storing an array in a JSON object with a field name like below:

    
    
    {"states": ["colorado","idaho","california"] }
    

is better than storing just the array:

    
    
    ["colorado","idaho","california"]
        

