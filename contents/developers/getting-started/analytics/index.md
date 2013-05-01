title: Analytics
author: Matthew De Goes 
date: 2013-03-26 12:20 
template: page-devcntr.jade

Developer Center

# Getting Started

## Analytics

The query interface to Precog is [Quirrel](/developers/quirrel/introduction), a simple but powerful analytical query language capable of handling multi-structured data like JSON.

There are three ways you can analyze data stored in Precog using Quirrel:

  * **REST API** - Precog exposes all of its functionality through a REST API. You can use the REST API directly, either using command-line tools like Curl or by using HTTP libraries.
  * **Client Libraries** - Precog develops and maintains a growing roster of client libraries for common programming languages. These libraries make it easier to use the REST API.
  * **Labcoat** - Precog supports a visual query builder called [Labcoat](https://labcoat.precog.com), which provides a friendly, graphical interface to analyze data.

### REST API

You can access the Precog REST API directly through the terminal using *Curl*, which is a command-line program which can be used to perform HTTP requests.

### Client Libraries

Precog currently supports the following client libraries:

  * [JavaScript](https://github.com/precog/precog_js_client)
  * [Java](https://github.com/precog/precog_java_client)
  * [Python](https://github.com/precog/precog_python_client)
  * [PHP](https://github.com/precog/precog_php_client)
  * [Ruby](https://github.com/precog/precog_ruby_client)
  * [NodeJS](https://github.com/precog/precog_js_client)
  * [C#](https://github.com/precog/precog_dotnet_client)

### Labcoat

[Labcoat](https://labcoat.precog.com) is a visual query builder that lets you
interactively develop and run queries against your Precog account.

Any query you build in Labcoat can be exported and run as production code
inside your application.