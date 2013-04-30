title: Labcoat Cloud
author: Matthew De Goes
date: 2013-03-26 12:20
template: page-devcntr.jade

<div id="body">
    <span class="page-title">Developer Center</span>
    <h1>REST API</h1>
    <h2>analytics api</h2>

    <p>The analytics API contains a variety of methods for computing analytics on data stored in Precog.</p>

    <h3>Execute a Fast Query</h3>

    <dl class="api-call-json">
        <dt class="button-json">JSON</dt>

        <dt class="m-title">GET</dt>

        <dd class="m-text">GET /analytics/v1/fs/<span class="tool-tip-path">'path</span>?q=<span class="tool-tip-query">[query]</span>&amp; limit=[limit]&amp;skip=[skip]&amp;sortOn=[sortOn] &amp;sortOrder=[sortOrder]&amp;apiKey=<span class="tool-tip-apikey">[auth API key]</span></dd>

        <dt class="d-title">description</dt>

        <dd class="d-text">
            <p>Executes a synchronous query relative to the specified base path. The HTTP connection will remain open for as long as the query is evaluating (potentially minutes).</p>

            <p>Not recommended for long-running queries, because if the connection is interrupted, there will be no way to retrieve the results of the query.</p>
        </dd>

        <dt class="r-title">response body</dt>

        <dd>
            <pre>
The results of the query.
</pre>
        </dd>
    </dl>
</div>