title: Security
author: Matthew De Goes
date: 2013-03-26 12:20
template: page-devcntr.jade

## security api

The security API is responsible for managing permissions for all data stored in Precog. The API can be used to manage API keys and grants.

An API key is required for interacting with all Precog data APIs. An API key may be associated with many different grants, each of which confers specific permissions with respect to some directory and data owner.

The fields "name" and "description" are optional fields taking arbitrary strings that increase the human read-ability of the output. "parentIds" is an optional field that can take the Grant ID of the parent grant. If no expiration date is set, the grant will not expire. To set an expiration date, provide an ISO8601 formatted string.

For more information on API keys and grants, see the Precog Security Model.

### List API Keys

  * JSON
  * GET
  * GET /security/v1/apikeys/?apiKey=<span class="tool-tip-apikey">[auth API key]</span>
  * description
  * Retrieves all API keys created by the authorization API key.
  * response body
  * <pre>[{"apiKey": "[API Key]"}, {"apiKey": "[API Key]"}, ...]</pre>

### Create an API Key

  * JSON
  * POST
  * POST /security/v1/apikeys/?apiKey=<span class="tool-tip-apikey">[auth API key]</span>
  * description
  * Creates a new API key that has the grants specified in the body of the request. The grants of the authorization API key will be used to issue the grants for the new API key. If multiple grants can be used to satisfy the requirements, then all of them will be used to issue the grants for the new API key.
  * request body
  * <pre>{

"name": ...

"description": ...

"grants": [{

"name": ...

"description": ...

"parentIds": ...

"expirationDate": ...

"permissions" : [{

"accessType": "read",

"path": "/foo/",

"ownerAccountIds": "[Owner Account Id]"

}, ...

]

}, ...

]
}
</pre>
    
  * response body
  * <pre>{&Ograve;apiKey&Oacute;: &Ograve;[API Key]&Oacute;}</pre>

### Describe an API Key

  * JSON
  * GET
  * GET /security/v1/apikeys/<span class="tool-tip-apikey tool-tip-apikey">'apiKey</span>
  * description
  * Retrieves the details of a particular API key. The API key must have been created by the authorization API key. If a given grant cannot be shared, it will not return information on the grant id (because this could be used to issue additional grants from the given grant).
  * response body
  * <pre>{

"apiKey": "[API key]",

"name": ...,

"description": ...,

"grants": [{

"grantId": "[Grant ID]",

"name": ...,

"description": ...,

"expirationDate": ...,

"permissions": [{

"accessType": "read",

"path": "/foo/",

"ownerAccountIds": "[Owner Account Id]"

}, ...

]

}, ...

]
}</pre>

### Delete an API Key

  * JSON
  * DELETE
  * DELETE /security/v1/apikeys/<span class="tool-tip-apikey tool-tip-apikey">'apiKey</span>
  * description
  * Deletes a particular API key.

### Retrieve the Grants of an API Key
  
  * JSON
  * GET
  * GET /security/v1/apikeys/<span class="tool-tip-apikey tool-tip-apikey">'apiKey</span>/grants/
  * description
  * Retrieves all the grants of a particular API key. If a grant cannot be shared, then its grant id will not be exposed, although its type and other settings will be visible.
  * <pre>[{
"grantId": "[Grant ID]",
"name": ...,
"description": ...,
"expirationDate": ...,
"permissions": [{
"accessType": "read",
"path": "/foo/",
"ownerAccountIds": "[Owner Account Id]"
}, ...
]
}, ...
]</pre>

### Add a Grant to an API Key

  * JSON
  * GET
  * GET /security/v1/apikeys/<span class="tool-tip-apikey tool-tip-apikey">'apiKey</span>/grants/
  * description
  * Adds the specified grant to the specified API key. The authorization API key must possess (possibly indirectly) the grant being added.
  * request body
  * <pre>{&Ograve;grantId&Oacute;: "[Grant Id]"}</pre>

### Remove a Grant from an API Key

  * JSON
  * DELETE
  * DELETE /security/v1/apikeys/<span class="tool-tip-apikey tool-tip-apikey">'apiKey</span>/grants/<span class="tool-tip-grant-id">'grantId</span>
  * description
  * Deletes a particular grant from an API key. The API key must have been created by the authorization API key, and the grant must have been added by the API key.

### Create a New Grant

  * JSON
  * POST
  * POST /security/v1/grants/?apiKey=<span class="tool-tip-apikey">[auth API key]</span>
  * description
  * Creates a new grant, derived from grants of the authorization API key. If the authorization key has multiple grants which can be used to satisfy the requirements of the new grant, then the least powerful such grant will be used to derive the new grant. If the authorization key does not have any grants which can be used to satisfy the requirements of the new grant, then the method will not succeed.
  * <pre>{
"name": ...
"description": ...
"parentIds": ...
"expirationDate": ...
"permissions" : [{
"accessType": "read",
"path": "/foo/",
"ownerAccountIds": "[Owner Account Id]"
}, ...
]
}</pre>
    
  * response body
  * <pre>{"grantId": "[Grant Id]"}</pre>

### Describe a Grant

  * JSON
  * GET
  * GET /security/v1/grants/<span class="tool-tip-grant-id">'grantId</span>?apiKey=<span class="tool-tip-apikey">[auth API key]</span>
  * description
  * Describes the details of a particular grant. Anyone who has access to the grant id can list the full details of the grant.
  * response body
  * <pre>{
"grantId": "[Grant ID]",
"name": ...,
"description": ...,
"expirationDate": ...,
"permissions": [{
"accessType": "read",
"path": "/foo/",
"ownerAccountIds": "[Owner Account Id]"
}, ...
]
}</pre>

### Delete a Grant

  * JSON
  * DELETE
  * DELETE /security/v1/grants/<span class="tool-tip-grant-id">'grantId</span>?apiKey=<span class="tool-tip-apikey">[auth API key]</span>
  * description
  * Deletes a particular grant specified by id. Only the creator of a grant can delete it.

### List Children of a Grant

  * JSON
  * GET
  * GET /security/v1/grants/<span class="tool-tip-grant-id">'grantId</span>/children/?apiKey=<span class="tool-tip-apikey">[auth API key]</span>
  * description
  * Lists all immediate children of the specified grant. Only the creator of a grant can list the children of the grant.
  * response body
  * <pre>[{
"grantId": "[Grant ID]",
"name": ...,
"description": ...,
"expirationDate": ...,
"permissions": [{
"accessType": "read",
"path": "/foo/",
"ownerAccountIds": "[Owner Account Id]"
}, ...
]
}, ...
]</pre>

### Create a Child Grant

  * JSON
  * POST
  * POST /security/v1/grants/<span class="tool-tip-grant-id">'grantId</span>/children/?apiKey=<span class="tool-tip-apikey">[auth API key]</span>
  * description
  * Creates a new grant that is derived from the specified grant. The child grant may be less powerful than the specified grant. When this grant is created, the shared property can indicate whether or not the new child grant can be shared. If the grant cannot be shared, then although it will appear on any API keys to which it is added, the id of the grant will not be exposed.
  * request body
  * <pre>{
"name": ...
"description": ...
"parentIds": ...
"expirationDate": ...
"permissions" : [{
"accessType": "read",
"path": "/foo/",
"ownerAccountIds": "[Owner Account Id]"
}, ...
]
}</pre>

  * response body
  * <pre>{"grantId": "[Grant Id]"}</pre>