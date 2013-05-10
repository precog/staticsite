title: Analytics
author: Matthew De Goes
date: 2013-03-26 12:20
template: page-devcntr.jade

## analytics api

The analytics API contains a variety of methods for computing analytics on data stored in Precog.

### Execute a Fast Query

  * JSON
  * GET
  * GET /analytics/v1/fs/<span class="tool-tip-path">'path</span>?q=<span class="tool-tip-query">[query]</span>&amp; limit=[limit]&amp;skip=[skip]&amp;sortOn=[sortOn] &amp;sortOrder=[sortOrder]&amp;apiKey=<span class="tool-tip-apikey">[auth API key]
  * description
  * Executes a synchronous query relative to the specified base path. The HTTP connection will remain open for as long as the query is evaluating (potentially minutes). Not recommended for long-running queries, because if the connection is interrupted, there will be no way to retrieve the results of the query.
  * response body
  * <pre>The results of the query.</pre>