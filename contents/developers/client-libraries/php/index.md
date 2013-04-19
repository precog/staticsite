title: Labcoat Cloud
author: Matthew De Goes
date: 2013-03-26 12:20
template: page-devcntr.jade

<div id="body">
    <span class="page-title">Developer Center</span>
    <h1>CLIENT LIBRARIES</h1>

    <p>Client libraries allow you to access the Precog REST API using a growing roster of popular programming languages. Client libraries can be used to either ingest data, query data, issue grants, or interact with other parts of the Precog API.</p>
    <h2>PHP</h2>

    <h3>GETTING STARTED: PHP</h3>

    <p>First, you need to download the client library from the <a href="https://github.com/reportgrid/client-libraries/tree/master/precog">public Github repository</a>. Then, you can use the php client library to ingest data or run queries.</p>

    <p>When using the php client library, you first need to require the library and create an instance of the PrecogAPI:</p>
    <pre>
require_once("Precog.php");
$api = new PrecogAPI("<span class="tool-tip-apikey">[auth API Key]</span>","<span class="tool-tip-root-path">[root path]</span>" [, "https://beta.Precog.com/"]);
</pre>

    <p>The first two arguments: "API Key" and "root path" are required. The third argument, "baseUrl" is optional and if not specified, defaults to "https://beta.Precog.com/"</p>

    <p>Then you have access to the functions in the php client library. These functions help provide easier access to many of the API calls.</p>

    <p>Note that all references to a path in the functions will be relative to the root path used in the creation of the instance of the new PrecogAPI. For example, if your root path is /000387509/ and you want to store data at /000387509/foo/bar/ then the path argument you will use in the store function is "/foo/bar/".</p>

    <h3>API REFERENCE: PHP</h3>

    <h4>Accounts API Functions</h4>

    <ul class="api-function">
        <li>
            <pre>
<span> createAccount</span>(string $email, string $password[,string $baseUrl [,string $version]])
</pre>
        </li>

        <li>
            <p>This function requires two strings as arguments: $email and $password. It returns an associative array that contains the accountId:</p>
            <pre>
array("accountId"=&gt; "2389482834")
</pre>
        </li>

        <li>
            <pre>
<span>describeAccount</span>(string $email, string $password, string $accountId[,string $baseUrl [,string $version]])
</pre>
        </li>

        <li>
            <p>This function requires three strings as arguments: $email, $password and $accountId. It returns an associative array that contains the details of the account:</p>
            <pre>
array("accountId"=&gt;"9384923423", "email"=&gt; " jdoe@gmail.com", "accountCreationDate"=&gt; "09-21-2001", "apiKey"=&gt; "[masterAPIKey]", "rootPath"=&gt; "/9384923423/", "plan"=&gt; array("type"=&gt; "developer"))
</pre>
        </li>

        <li>
            <pre>
<span>addGrantToAccount</span>(string $email, string $password, string $accountId, string $grantId[, string $baseUrl [,string $version]])
</pre>
        </li>

        <li>
            <p>This function requires four strings as arguments: $email, $password, $accountId and $grantId.</p>
        </li>

        <li>
            <pre>
<span>describePlan</span>(string $email, string $password, string $accountId[, string $baseUrl [, string $version]])
</pre>
        </li>

        <li>
            <p>This function requires three strings as arguments: $email, $password and $accountId. It returns an associative array containing the account's plan type:</p>
            <pre>
array("type"=&gt; "free")
</pre>
        </li>

        <li>
            <pre>
<span>changePassword</span>(string $email, string $oldPassword, string $newPassword, string $accountId[, string $baseUrl [, string $version]])
</pre>
        </li>

        <li>
            <p>This function requires four strings as arguments: $email, $oldPassword, $newPassword and $accountId.</p>
        </li>

        <li>
            <pre>
<span>changePlan</span>(string $email, string $password, string $accountId, string $plan[, string $baseUrl [, string $version]])
</pre>
        </li>

        <li>
            <p>This function requires four strings as arguments: $email, $password, $accountId and $plan. Please see this <a href="http://www.Precog.com/products/precog/pricing">list of plan types</a> for additional details.</p>
        </li>

        <li>
            <pre>
<span>deletePlan</span>(string $email, string $password, string $accountId[, string $baseUrl [, string $version]])
</pre>
        </li>

        <li>
            <p>This function requires three strings as arguments: $email, $password and $accountId.</p>
        </li>
    </ul>

    <h4>Ingest API Functions</h4>

    <ul class="api-function">
        <li>
            <pre>
<span>  ingest</span>(string $path, string $content, string $type [, array $options = array()] )
</pre>
        </li>

        <li>
            <p>This function requires three strings as arguments: the path to store, the content to be ingested and the format of the content which can be either "json" or "csv". The optional $options argument allows you to specify asychronus ingest instead of synchronus ingest. To use this option, pass this array as the optional argument: array("async"=&gt; true).</p>

            <p>Note that the path to store data is relative to the root path used to construct the instance of the PrecogAPI. For example, if your root path is /000387509/foo/ and you want to store data at /000387509/foo/bar/ then the path argument you will use in the ingest function is "/bar/".</p>
        </li>

        <li>
            <pre>
<span> store</span>(string $path, mixed $event, [, array $options = array()])
</pre>
        </li>

        <li>
            <p>This function requires two arguments: the path to store the data formatted as a string and a single event formatted as an associative array such as -</p>
            <pre>
array("impression" =&gt; array( "browser" =&gt; "Chrome" ))
</pre>The optional $options argument allows you to specify asychronus ingest instead of synchronus ingest. To use this option, pass this array as the optional argument: array("async"=&gt; true).

            <p>Note that the path to store data is relative to the root path used to construct the instance of the PrecogAPI. For example, if your root path is /000387509/foo/bar and you want to store data at /000387509/foo/bar/baz then the path argument you will use in the store function is "/baz/".</p>
        </li>

        <li>
            <pre>
<span> delete</span>(string $path)
</pre>
        </li>

        <li>
            <p>This function requires a string: the path to be deleted. <span>CAUTION: This method cannot be undone!</span> Be certain that you want to delete this path.</p>

            <p>Note that the path to be deleted is relative to the root path used to construct the instance of the PrecogAPI. For example, if your root path is /000387509/ and you want to delete /000387509/foo/bar/ then the path argument you will use in the delete function is "/foo/bar/".</p>
        </li>
    </ul>

    <h4>Metadata API Functions</h4>

    <ul class="api-function">
        <li>
            <pre>
<span>retrieveMetadata</span>(string $path [, string $type])
</pre>
        </li>

        <li>
            <p>This function requires a string: metadata will be returned for the path provided. The default option is to return all metadata as an associative array:</p>
            <pre>
array("size"=&gt; 1024, "structure"=&gt; array("types"=&gt;  array("Object"=&gt; 1923, "Array"=&gt; 9743, "String"=&gt; 93, "Boolean"=&gt; 712, "Number"=&gt; 23745)), "children"=&gt; ["foo", "bar"]) 
</pre>You can also add an optional string argument specifying the $type of metadata desired. Valid types currently include: "size", "structure" and "children".

            <p>Note that the path argument is relative to the root path used to construct the instance of the PrecogAPI. For example, if your root path is /000387509/ and you want metadata /000387509/foo/ then the path argument you will use in the retrieveMetadata function is "/foo/". If you want metadata for your root path, simply pass an empty string as the first argument.</p>
        </li>

        <li>
            <pre>
<span>listChildren</span>(string $path)
</pre>
        </li>

        <li>
            <p>This function requires a string: the path for which children are desired. It returns an array containing the child paths: array( "foo", "bar", "child",...).</p>

            <p>Note that the path argument is relative to the root path used to construct the instance of the PrecogAPI. For example, if your root path is /000387509/ and you want metadata /000387509/foo/ then the path argument you will use in the retrieveMetadata function is "/foo/". If you want the children for your root path, simply pass an empty string as the first argument.</p>
        </li>
    </ul>

    <h4>Analytics API Functions</h4>

    <ul class="api-function">
        <li>
            <pre>
<span> query</span>(string $quirrel, [, array $options = array()])
</pre>
        </li>

        <li>
            <p>This function requires a string: a properly formatted quirrel query. It will return an array of arrays that contains the results of the query:</p>
            <pre>
array(array("customer"=&gt; array("ID"=&gt;"1D7A8ACC", "state"=&gt;"SC", "age"=&gt;41, "isCasualGamer"=&gt;false), array("product"=&gt; array("price"=&gt; 0.99, "ID"=&gt;"0232C378")), "date"=&gt;"2010-01-01"...)). 
</pre>You can also pass an array of options that allow you to limit, skip and sort results. For example, passing
            <pre>
array("limit"=&gt;1000) 
</pre>as the second argument will limit the query to 1000 results. To combine limit and skip you could use:
            <pre>
array("limit" =&gt; 5000, "skip" =&gt; 5000)
</pre>Using sort requires speciying the variable to sort on and the order to sort (the acceptable strings are "asc" and "desc"):
            <pre>
array("sortOn" =&gt; "foo", "sortOrder" =&gt; "asc")
</pre>

            <p>Note that paths in quirrel are relative to the root path used to construct the instance of the PrecogAPI. This impacts the usage of the load function in quirrel. For example, if your root path is /000387509/ and you want to load data from /000387509/test/data, the proper load syntax is //test/data or load("//test/data").</p>
        </li>
    </ul>

    <h4>Security API Functions</h4>

    <ul class="api-function">
        <li>
            <pre>
<span> listKeys</span>()
</pre>
        </li>

        <li>
            <p>This function does not require any arguments. It returns an array of arrays:</p>
            <pre>
array(array("apiKey"=&gt; "anAPIKey"), array(...)...)
</pre>
        </li>

        <li>
            <pre>
<span>createKey</span>(array $grants)
</pre>
        </li>

        <li>
            <p>This function requires one argument: an array containing an array of arrays. For example, to create a key that has read access to path /foo/ and /foo2/ pass the following:</p>
            <pre>
array("grants"=&gt;array(array("type"=&gt;"read", "path"=&gt;"/foo/", "ownerAccountId"=&gt; "accountId", "expirationDate"=&gt; null), array("type"=&gt;"read", "path"=&gt;"/foo2/", "ownerAccountId"=&gt; "accountId", "expirationDate"=&gt; null)))
</pre>

            <p>It returns an array containing the API key:</p>
            <pre>
array("apiKey"=&gt; "anAPIKey")
</pre>.
        </li>

        <li>
            <pre>
<span>describeKey</span>(string $apiKey)
</pre>
        </li>

        <li>
            <p>This function requires one argument: an API key formatted as a string. It returns an array of arrays:</p>
            <pre>
array( array("apiKey"=&gt; "anAPIKey"), array("grants"=&gt;array(array("grantId"=&gt;"aGrantId", "type"=&gt; "read", "path"=&gt; /"/foo/", "ownerAccountId"=&gt;"accountId", "expirationDate"=&gt; null))))
</pre>
        </li>

        <li>
            <pre>
<span> deleteKey</span>(string $apiKey)
</pre>
        </li>

        <li>
            <p>This function requires one argument: an API key formatted as a string. The API key must have been created by the authorization API key. The authorization API key is the one used to create the instance of the PrecogAPI instance. The authorization API key cannot delete itself.</p>
        </li>

        <li>
            <pre>
<span> retrieveGrants</span>(string $apiKey)
</pre>
        </li>

        <li>
            <p>This function requires one argument: an API key formatted as a string. The result is an array of arrays providing details about the grants:</p>
            <pre>
array(array("grantId"=&gt;"aGrantId", "type"=&gt; "read", "path"=&gt; "/foo/", "ownerAccountId"=&gt;"accountId", "expirationDate"=&gt; null), array(...)...)
</pre>
        </li>

        <li>
            <pre>
<span> addGrantToKey</span>(string $apiKey, string $grantId)
</pre>
        </li>

        <li>
            <p>This function requires two arguments: an API key and a grant Id, both formatted as a strings.</p>
        </li>

        <li>
            <pre>
<span>removeGrant</span>(string $apiKey, string $grantId)
</pre>
        </li>

        <li>
            <p>This function requires two arguments: an API key and a grant Id, both formatted as a strings. The API key must have been created by the authorization API key, and the grant must have been added by the API key.</p>
        </li>

        <li>
            <pre>
<span>createGrant</span>(array $type)
</pre>
        </li>

        <li>
            <p>This function requires one argument: an array containing the grant details. For example:</p>
            <pre>
array("type"=&gt;"read", "path"=&gt;"/foo/", "ownerAccountId"=&gt; "accountId", "expirationDate"=&gt; null).
</pre>It returns an array containing the grant Id:
            <pre>
array("grantId"=&gt;"grantId")
</pre>
        </li>

        <li>
            <pre>
<span> describeGrant</span>(string $grantId)
</pre>
        </li>

        <li>
            <p>This function requires one argument: a grant Id formatted as a string. It returns an array containing the grant Id and grant details:</p>
            <pre>
array("grantId"=&gt; "grantId", "type"=&gt;"read", "path"=&gt;"/foo/", "ownerAccountId"=&gt; "accountId", "expirationDate"=&gt; null).
</pre>
        </li>

        <li>
            <pre>
<span>deleteGrant</span>(string $grantId)
</pre>
        </li>

        <li>
            <p>This function requires one argument: a grant Id formatted as a string. Only the creator of a grant can delete it.</p>
        </li>

        <li>
            <pre>
<span>listGrantChildren</span>(string $grantId)
</pre>
        </li>

        <li>
            <p>This function requires one argument: a grant Id formatted as a string. It returns an array of arrays containing the immediate children of the grant Id:</p>
            <pre>
array(array("grantId"=&gt; "grantId", "type"=&gt;"read", "path"=&gt;"/foo/", "ownerAccountId"=&gt; "accountId", "expirationDate"=&gt; null),array("grantId"=&gt; "grantId", "type"=&gt;"read", "path"=&gt;"/foo2/", "ownerAccountId"=&gt; "accountId", "expirationDate"=&gt; null)).
</pre>
        </li>

        <li>
            <pre>
<span>createGrantChild</span>(string $grantId, array $type)
</pre>
        </li>

        <li>
            <p>This function requires two arguments: a grant Id formatted as a string and an array providing type details:</p>
            <pre>
array( "type"=&gt;"write, "path"=&gt;"/bar/", "experirationDate"=&gt; 0).  It returns an array containing the child of the grant: array("grantId"=&gt;"grantId")
</pre>
        </li>
    </ul>
</div>