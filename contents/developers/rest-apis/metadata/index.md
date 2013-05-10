title: MetaData
author: Matthew De Goes
date: 2013-03-26 12:20
template: page-devcntr.jade

## metadata api

The metadata API provides a one-stop resource for metadata on the structure of data, statistics on queries, and so forth.

### Retrieve Path Metadata

  * JSON
  * GET
  * GET /meta/v1/fs/<span class="tool-tip-path">'path</span>?type=[type]&amp;property=[JSON property]&amp;apiKey=<span class="tool-tip-apikey">[auth API key]</span></dd>
  * description
  * Retrieves metadata for a particular path in the file system.The valid metadata types (the `type=[type]` parameter) include `size`, `structure`, and `children`. If no metadata type is specified, then all metadata is returned. You can retrieve information about a specific JSON property by specifying the `property=[JSON property]` query parmeter. This works the same way _derefing_ and object in Quirrel works. For example, if our data looks like `{"a": [0, 1]}`, we can retrieve metadata for the 1st element of the "a" property by using `property=a[0]`. This is only valid if `type` is _structure_ or omitted. _Note that we currently do not provide counts of objects and arrays inside of the `structure.types` object, though this is planned for a future release_
  * response body
  * <pre>{
"size": 36216,
"structure": {
"children": [ ".a", ".b" ],
"types": {
"Object": 1923,
"Array": 9743,
"String": 93,
"Boolean": 712,
"Number": 23745
}
},
"children": ["foo/", "bar/"]
}</pre>