title: Getting Started
author: Matthew De Goes 
date: 2013-03-26 12:20 
template: page-devcntr.jade

Developer Center

## Signup

Please visit the [Signup Page](https://www.precog.com/account/login/) to sign
up for a cloud-hosted account. When you signup, you'll be given an *account ID*, 
an *API key*, and a *root path*. 

  * **Account ID** - Your account ID is globally unique and identifies your Precog account in a way that is stable, even if you decide to change your email address or API keys later.
  * **API Key** - Your API key allows you to interact with the Precog API. The API key can be thought of as a combination of a username and a password.
  * **Root Path** - Your root path is where all of your data lives inside the Precog file system. Your root path is just equal to */'accountId*, where *'accountID* is your account ID.

You can always find this information on your [account page](https://www.precog.com/account/) after logging in.

## Precog File System

Precog uses the metaphor of a file system to help you organize and share data.
When you store data in Precog, you must choose a directory to store the
data in.

You don't have to create directories manually. Directories are
created on-demand whenever you try to put data in a directory that doesn't
exist yet.

Precog doesn't support the notion of "databases" or "tables" or "collections".
Instead, you can use the file system to create however many levels of
organization make sense to you.

The Precog file system forms the basis of the security model, because all
grants are tied to a specific path. So the decision of how to organize your 
data is not completely arbitrary (unless you have no intention of sharing 
access to your data).

The file system and associated security model make Precog multi-tenant out of the box.

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

### Root Path

When you create an account, you are assigned a unique root path. This root
path is the same as your account ID.

You will need to use your root path whenever you try to read or write data
in Precog, because initially, you will only have permissions for data in 
that directory.

## Precog Data Model

Precog natively stores and analyzes [JSON](http://www.json.org/) data (actually, a superset of JSON data, but that's a detail you can ignore when getting started).

You can store any JSON value inside the Precog file system, as well as append JSON values to existing resources.

A JSON object is an unordered set of name/value pairs. For example:
        
    { "age:" 36,"customerID": "0019327","status": "active" }    

Note that it is important that numeric values not be surrounded by quotes or
they will be interpreted as strings and not as numeric values.

When possible, you should try to store your data as JSON objects, so that all data is labeled. 

For example:

    {"age": 19}        

is better style than:

    19

Similarly, storing an array in a JSON object with a field name like below:

    {"states": ["colorado","idaho","california"] }    

is better than storing just the raw array:
    
    ["colorado","idaho","california"]
  
However, Precog imposes no restrictions on the type of data you can store, and different values may have completely different schemas.

## Data Ownership

Your API key is tied to your Precog account. Any data you write to your root
path is automatically *owned* by your Precog account. This means no one can
see it unless you give them permission to see it.

Precog is secure by default.

Data ownership is tracked exhaustively in Precog so that no one can see
data unless the owner of the data has given them permission to see it.

## Grants

Precog manages permissions with the concept of *grants*. Grants confer some specific capability to the holder. Grants may be added to existing API keys.

Precog currently supports the following kinds of grants:

  * **Read** - This grant lets you read any data in a path that is owned by a set of accounts.
  * **Write** - This grant lets you insert new data in a path that will be owned by one of a set of accounts.
  * **Delete** - This grant lets you delete any data in a path that is owned by a set of accounts.
  
When you signup for a Precog account, you are given the ability to read any data that you own
(across the entire Precog file system, not just your root directory);
the ability to write data owned by anyone (but only inside your root directory), and the 
ability to delete data owned by anyone (only inside your root directory).

If you have a grant, you can use that grant to create another grant which is
either less powerful than the original grant, or just as powerful as the
original grant.

For example, if you have a read grant to a path called */foo/*, then you can use
that read grant to create another read grant for */foo/bar/* (which is strictly
less powerful than the original grant). Or if you have a write grant for */foo/*
that does not expire, you could use that write grant to create another write
grant for */foo/* that expires in two days.

If you use a first grant to create a second grant, then you can revoke the second 
grant at any time. Additionally, if your grant is revoked, then all derived grants 
are revoked automatically.