title: FAQ
author: Matthew De Goes
date: 2013-03-26 12:20
template: page-devcntr.jade

Developer Center

# Getting Started

## FAQ

### What is Precog?

Precog is a schemaless, columnar database designed for storing and analyzing
semi-structured, measured data.

**Schemaless.** Precog does not require that users create schemas. Precog identifies data that has identical schema and only stores that schema once, to maximize performance.

**Columnar.** Precog stores data in a column-major format that ensures all data from the same column is stored together. For typical analytical queries that only involve one or a few columns, this results in a dramatic reduction in IO, which improves performance.

**Storing.** Precog can import data from other sources, but it is designed to work as the primary authority for measured data. Your existing database will continue to store entity-oriented data, such as people, places, and things.

**Analyzing.** Precog supports the data analysis language called Quirrel, which provides a simple way to perform in-database analytics, statistics, and machine learning on measured data.

**Semi-structured.** Precog can store any kind of semi-structured data, ranging from lines in a log file, to heavily nested data structures containing objects, arrays, and primitives.

**Measured Data.** Precog is designed for storing measured data, such as events (users clicking, engaging, and buying), sensor data, activity stream data, facts, and other kinds of data that do not need to be mutably updated.

Precog was designed for the cloud, so all of Precog's functionality is exposed
by REST APIs, which are documented in our Developer Center. Client libraries
are available in JavaScript, Python, PHP, Ruby, Java, C#, and other common
programming languages.

### Does Precog have tables?

Tables help developers organize data that has similar schema (collections
serve a similar purpose in many NoSQL databases). Precog does not support
tables, but supports a more flexible organizational mechanism modeled after
file systems.

When you store data in Precog, you need to choose a location in the file
system to store the data. If you choose a location that does not exist yet, it
will be created automatically.

The file system supports any number of levels, so you can organize your data
in ways that are far more flexible and fine-grained than tabular organization.

### Does Precog support security?

Most databases have no meaningful security model. Precog, because it's
designed to be used by web, mobile, and server applications, has a very robust
security model built-in.

The security model revolves around the file system, and lets you give very
fine-grained permissions to different API keys. Precog uses the same security
model to provision customer accounts, and you can use the security model to
provision your own customers or users (who could do further provisioning).

### What kind of data does Precog support?

The Precog data model is a strict superset of the JSON data model. Any valid
JSON can be stored unmodified in Precog.

JSON can be nested to any depth. For example, instead of having table
containing customers and a table containing addresses, you can store all a
customer's addresses inside a single object:

    
    
    {
    
    ÒcustomerIdÓ: Ò12312321Ó,
    
    ÒaddressesÓ: [{ÒaddressÓ: Ò221 B Baker StreetÓ}, {ÒP Sherman 42, Wallaby WayÓ}]
    
    }
    

Because Precog lets you store data in denormalized form, you can often avoid
doing costly run-time joins, which do not scale well as your data volume
increases.

### Does Precog support schemas?

Precog doesn't require you to specify schemas upfront. However, Precog will
detect duplicated schemas and only store the schema once, to increase runtime
performance.

Unlike relational databases with strict schemas and strong normalization
requirements, Precog makes it easy to store denormalized data or dirty data,
and refine the structure and content of your data over time.

### What language is Precog written in?

Precog is implemented in Scala. Scala is a high-performance, functional /
object-oriented hybrid language that runs on the Java Virtual Machine. Scala
is used to create high-performing, distributed software by Twitter,
FourSquare, LinkedIn, and many other companies.

### What languages can I use to work with Precog?

Precog supports a growing collection of client libraries. If you use a
language that doesn't have a client library, just let us know and we'll add it
for you!

### Does Precog support SQL?

No. SQL is an excellent language for storing, retrieving, and aggregating
entity-oriented data, but most kinds of data science are not possible using
SQL. Precog supports Quirrel, a highly expressive data analysis language that
makes it easy to do in-database analytics, statistics, and machine learning
across any kind of measured data.

### Does Precog replace my existing database?

No. Precog works alongside your existing entity-oriented database to store all
the measured data generated from your application. Measured data includes
event-oriented data (like clicks, transactions, and other user actions), as
well as sensor data, activity stream data, and anything you would otherwise
store in a relational fact table.

Measured data is immutable. Therefore, Precog doesn't have the ability to
update or delete a single record. If you need the ability to mutably update
and delete individual records, you are probably storing entities (person,
places, or things) and would be better served by an entity-oriented database.

Although you can store measured data in your existing database, you won't be
able to perform deep analysis and you will eventually encounter performance
problems as your data grows. Precog is built to store never-ending streams of
measured data, and can perform in-database analytics, statistics and machine
learning.

### What are typical uses for Precog?

Precog is a flexible platform that provides a rapid way to solve many problems
in embeddable reporting, data science and data productization. In general, if
you want to store and analyze measured data, then Precog is a good fit and
will outperform other technologies in this role.

### Does Precog support transactions?

Since Precog is designed to support immutable measured data, it does not
support transactions in the classic relational sense. However, Precog does
support the reliable storage (with acknowledgement) of measured data.

### Are writes written to disk immediately, or lazily?

Precog immediately writes data to a transaction log, which is used to build
out the main data structures that Precog uses to store data. If data is sent
to Precog with acknowledgement turned on, then the request will not return
until after the data has been committed to the transaction log, at which point
the data can be considered secure and will eventually be available for
querying.

Precog is an eventually consistent data store, so that writes may not
immediately be reflected in reads (although in practice, the delay is usually
quite small).

### Where is Precog hosted?

Precog's cloud offering is hosted in a variety of data centers to maximize
availability and performance.

### Is Precog built on Hadoop, Cassandra or something else?

Precog is original technology highly-optimized for storing and analyzing
measured data. It is not built on any other database technology.

### How does Precog differ from NoSQL databases?

NoSQL databases are designed to store entities, such as people, places, and
things. Precog is designed to store measured data, like events that describe
what users are doing, events that describe what a system is doing, or the
results of a survey or poll.

NoSQL databases make it easy to store and retrieve entity-oriented data.
Precog makes it easy to store, retrieve, and deeply analyze measured data.
Many use cases that are hard or impossible with NoSQL databases are very
straightforward using Precog.

### How does Precog Differ from Hadoop / Cassandra?

Hadoop is a distributed file system, which makes it easy to store any kind of
data. Hadoop is often used to store measured data, but Hadoop only provides
low-level, batch-oriented ways of analyzing data. Precog is much more than a
file system, is a high-level data science platform that lets you do in-
database analytics, statistics, and machine learning.

### What makes Precog different than other databases?

Other databases aren't designed to store and analyze measured data. Precog is
designed specifically for this kind of data, and provides not just a simple
way to capture and store never-ending streams of measured data, but an
extremely powerful way to analyze this data. Quirrel, the query language
supported natively by Precog, makes it easy to do in-database analytics,
statistics, and machine learning, without having to write code.

### Does Precog support other databases?

Yes. Precog is designed to work well with your existing entity-oriented
database. Precog can import data from NoSQL databases and relational
databases.

### What are the current limits of the beta version of Precog?

For maximum performance, the beta is limited to the following:

  * Less than a terabyte of data.
  * 250 or fewer values per record.
  * Only top-level inequalities.

These limitations will be lifted when Precog emerges from beta.

### Does Precog provide an on-premise solution?

Precog is still in beta, but please contact us if you are interested in an on-
premise solution.

### How do ReportGrid and Labcoat relate to Precog?

ReportGrid is an HTML5 visualization engine that connects to Precog.
ReportGrid can be used to interactively or programmatically build charts and
reports. Many customers use ReportGrid and Precog to deploy self-service
reporting inside their applications.

Labcoat is an HTML5 app built on the Precog API that makes it easy to develop
Quirrel queries. Labcoat has built-in help, syntax highlighting, and data
management. Many developers use Labcoat to analyze data, then export the
analysis as code that runs inside their applications.

Both ReportGrid and Labcoat can be embedded inside your application, white-
labeled, and exposed to your end-users.

