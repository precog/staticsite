title: Labcoat Cloud
author: Matthew De Goes
date: 2013-03-26 12:20
template: page-devcntr.jade

## ingest api

The ingest API allows streaming or batch uploading of data into the Precog platform. Various kinds of data can be ingested by Precog, including JSON, CSV, and XML. They can be ingested in raw form or in compressed form, and in single-record form or multiple-record form (multiple record form requires each entry be separated by a newline character).

The current estimated ingest rate is approximately 3,000 records per second.

### Ingest Data Asynchronously

  * JSON
  * POST
  * POST /ingest/v1/async/fs/<span class="tool-tip-path">'path</span>?apiKey=<span class="tool-tip-apikey">[auth API key]</span>&amp;ownerAccountId=[Owner Account Id]</dd>
  * description
  * Asynchronously uploads data to the specified path and file name. The method will return almost immediately with an HTTP ACCEPTED response. The optional owner account ID parameter can be used to disambiguate the account that owns the data, if the API key has multiple write grants to the path with different owners.

### Ingest Data Synchronously

  * JSON
  * POST
  * POST /ingest/v1/sync/fs/<span class="tool-tip-path">'path</span>?apiKey=<span class="tool-tip-apikey">[auth API key]</span>&amp;ownerAccountId=[Owner Account Id]</dd>
  * description
  * Synchronously uploads data to the specified path and file name. The method will not return until the data has been committed to the transaction log. Queries may or may not reflect data committed to the transaction log. The optional owner account ID parameter can be used to disambiguate the account that owns the data, if the API key has multiple write grants to the path with different owners.

### Delete Path

  * JSON
  * DELETE
  * DELETE ingest/v1/async/fs/'path?apiKey=[apiKey]</dd>
  * description
  * Deletes the specified path. CAUTION! This method cannot be undone.