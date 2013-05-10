title: FAQ
author: Matthew De Goes
date: 2013-03-26 12:20
template: page-devcntr.jade

## FAQ

### What is Precog

Precog is a schemaless, columnar database designed for storing and analyzing multi-structured data like JSON.

  * **Schemaless.** Precog does not require that users create schemas. Precog identifies data that has identical schema and only stores that schema once, to maximize performance.
  * **Columnar.** Precog stores data in a column-major format that ensures all data from the same column is stored together. For typical analytical queries that only involve one or a few columns, this results in a dramatic reduction in IO, which improves performance.
  * **Storing.** Precog can import data from other sources, but it is designed to work as the primary authority for analytical JSON data. Your existing database will continue to store entity-oriented data, such as people, places, and things.
  * **Analyzing.** Precog supports the analytical query language called Quirrel, which provides a simple way to perform advanced analytics on JSON data.
  * **Multi-structured.** Precog can store any kind of multi-structured data, ranging from lines in a log file, to heavily nested data structures containing objects, arrays, and primitives.

When for our cloud or appliance offerings, all of Precog's functionality is 
exposed by REST APIs, which are documented in the Developer Center. Client 
libraries are available in JavaScript, Python, PHP, Ruby, Java, C#, and other common
programming languages.

### Does Precog have tables

Tables help developers organize data that has similar schema (collections
serve a similar purpose in many NoSQL databases). Precog does not support
tables, but supports a more flexible organizational mechanism modeled after
file systems.

When you store data in Precog, you need to choose a location in the file
system to store the data. If you choose a location that does not exist yet, it
will be created automatically.

The file system supports any number of levels, so you can organize your data
in ways that are far more flexible and fine-grained than traditional organization 
through databases and tables.

Unlike tables in RDBMS technology, the data you store in Precog does not
have to possess uniform structure or schema. You can perform analysis
of data with mixed structure and schema.

### Does Precog support security

Most databases have no meaningful security model. Precog, because it's
designed to be used directly by web, mobile, and server applications, has a 
very robust security model built-in.

The security model revolves around the file system, and lets you give very
fine-grained permissions to different API keys. Precog uses the same security
model to provision customer accounts, and you can use the security model to
provision your own customers or users.

### What kind of data does Precog support

The Precog data model is a strict superset of the JSON data model. Any valid
JSON can be stored unmodified in Precog.

JSON can be nested to any depth. For example, instead of having table
containing customers and a table containing addresses, you can store all a
customer's addresses inside a single object:

    {
      "customerId": "12312321",
      "addresses": [{"address": "221 B Baker Street"}, {"P Sherman 42, Wallaby Way"}]
    }

Because Precog lets you store and analyze multi-structured data natively,
you can eliminate all the time you would ordinarily spend creating data models,
forcing your data into tabular form, and maintaining schema homogeneity over time.

### Does Precog support schemas

Precog doesn't require you to specify schemas upfront. However, Precog will
detect duplicated schemas and only store the schema once, to increase runtime
performance.

Unlike relational databases with strict schemas and strong normalization
requirements, Precog makes it easy to store denormalized data or dirty data,
and refine the structure and content of your data as necessary.

### What language is Precog written in

Precog is implemented in Scala. Scala is a high-performance, functional /
object-oriented hybrid language that runs on the Java Virtual Machine. Scala
is used to create high-performing, distributed software by Twitter,
FourSquare, LinkedIn, and many other companies.

### What languages can I use to work with Precog

Precog supports a growing collection of client libraries. If you use a
language that doesn't have a client library, just let us know and we'll add it
for you!

### Does Precog support SQL

No. SQL is an excellent language for storing, retrieving, and aggregating
highly structured, tabular data. However, SQL does not support heterogeneous 
JSON data, and can only do simple analytics.

Precog supports Quirrel, a simple, but highly expressive query language 
that makes it easy to simple or advanced analytics on JSON data.

### Does Precog replace my existing database

No. Precog works alongside your existing operational database to store all
the analytical data generated from your application. Analytical data includes
event-oriented data (like clicks, transactions, and other user actions), as
well as sensor data, activity stream data, and anything you would otherwise
store in a relational fact table.

Analytical data is immutable. Therefore, Precog doesn't have the ability to
efficiently update or delete single records. If you need the ability to mutably 
update and delete individual records, you are probably storing entities (person,
places, or things) and would be better served by an operational database.

Although you can store analytical data in your existing operational database, 
you won't be able to perform deep analysis and you will eventually 
encounter performance problems as your data grows. Precog is built to store 
never-ending streams of analytical data, and can perform in-database analytics, 
statistics and machine learning.

### What are typical uses for Precog

Precog is a flexible analytics platform that provides a rapid way to solve many 
complex analytical problems. In general, if you want to store and perform 
analytics on multi-structured data like JSON, then Precog is a good fit and
will outperform other technologies in this role.

### Does Precog support transactions

Since Precog is designed to support immutable analytical data, it does not
support transactions in the classic relational sense. However, Precog does
support the reliable storage (with acknowledgement) of analytical data.

### Are writes written to disk immediately, or lazily

Precog immediately writes data to a transaction log, which is used to build
out the main data structures that Precog uses to store data. If data is sent
to Precog with acknowledgement turned on, then the request will not return
until after the data has been committed to the transaction log, at which point
the data can be considered secure and will eventually be available for
querying.

Precog is an eventually consistent data store, so that writes may not
immediately be reflected in reads (although in practice, the delay is usually
quite small).

### Where is Precog's managed cloud hosted

Precog's cloud offering is hosted in a variety of data centers to maximize
availability and performance.

### Is Precog built on Hadoop, Cassandra or something else

Precog is original technology highly-optimized for storing and analyzing
multi-structured data. It is not built on any other database technology.

### How does Precog differ from NoSQL databases

All current NoSQL databases are operational databases, designed to store entities, 
such as people, places, and things. Precog is designed to store analytical data, 
like events that describe what users are doing, events that describe what a system 
is doing, or the results of a survey or poll.

NoSQL databases make it easy to store and retrieve entity-oriented data.
Precog makes it easy to store, retrieve, and deeply analyze analytical data.
Many use cases that are hard or impossible with NoSQL databases are very
straightforward using Precog.

### Does Precog support other databases

Yes. Precog is designed to work well with your existing entity-oriented
database. Precog can import data from NoSQL databases and relational
databases.

### Does Precog provide an on-premises solution

Yes, Precog is available in a managed cloud offering, a hardware appliance, 
and a virtual appliance.
