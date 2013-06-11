title: Easy Analytics on NoSQL Data
author: Matthew De Goes
date: 2013-03-26 12:20
template: page-flexible.jade

<div id="body-splash">
    <div class="holder">
        <div class="image-panel">
            <h4>Stream JSON data into Precog</h4>
            <pre>Precog.append({
  <span class="blue">"path"</span>: <span class="blue">"/events.json"</span>,
  <span class="blue">"value"</span>: {<span class="blue">"Any"</span>: [<span class="blue">"valid"</span>, {<span class="blue">"JSON"</span>: <span class="blue">"goes"</span>}, <span class="blue">"here."</span>]}
});</pre>
            <h4>Upload data files into Precog</h4>
            <pre>Precog.uploadFile({
  <span class="blue">"path"</span>: <span class="blue">"/dumps/today/data.json"</span>,
  <span class="blue">"contents"</span>: fileContents, <span class="blue">"type"</span>: <span class="blue">"application/json"</span>
});</pre>
            <h4>Analyze arbitrary JSON</h4>
            <pre>Precog.execute({
  <span class="blue">"query"</span>: <span class="blue">"count((//events.json).location[2])"</span>
});</pre>
        </div>
        <div class="text-panel">
            <p>Precog is a next-generation analytics platform that lets you easily store and analyze JSON data, without having to manipulate or transform the data, impose a rigid schema, or flatten it into tables. You can do everything from simple analytics to advanced statistics and machine learning.</p>
        </div>
        <div class="clear-left">
        </div>
    </div>
</div>
<div id="body-howitworks">
    <div id="hiw-menu">
        <div class="holder">
            <ul>
                <li><i class="icon-download-alt"></i> Store</li>
                <li><i class="icon-bolt"></i> Enrich</li>
                <li><i class="icon-search"></i> Analyze</li>
                <li><i class="icon-bar-chart"></i> Visualize</li>
                <div class="arrow-up"></div>
            </ul>
        </div>
    </div>
    <div class="holder">
        <div id="howitworks-panel">
            <div id="store" class="panel active">
                <div class="active-content panel-content javascript-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Append a JSON value</span>
Precog<span style='color:#d2cd86; '>.</span>append<span style='color:#d2cd86; '>(</span><span style='color:#b060b0; '>{</span>path<span style='color:#b060b0; '>:</span> <span style='color:#00c4c4; '>'/foo/'</span><span style='color:#d2cd86; '>,</span> value<span style='color:#b060b0; '>:</span> <span style='color:#b060b0; '>{</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>hello</span><span style='color:#02d045; '>"</span><span style='color:#b060b0; '>:</span> <span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>world</span><span style='color:#02d045; '>"</span><span style='color:#b060b0; '>}</span><span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>

<span style='color:#9999a9; '>// Upload a file</span>
Precog<span style='color:#d2cd86; '>.</span>uploadFile<span style='color:#d2cd86; '>(</span><span style='color:#b060b0; '>{</span>path<span style='color:#b060b0; '>:</span> <span style='color:#00c4c4; '>'/foo/data.json'</span><span style='color:#d2cd86; '>,</span> type<span style='color:#b060b0; '>:</span> <span style='color:#00c4c4; '>'application/json'</span><span style='color:#d2cd86; '>,</span> contents<span style='color:#b060b0; '>:</span> file<span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>
                    </pre>
                </div>
                <div class="panel-content java-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Append a JSON value</span>
Map&lt;String,Object> json = new HashMap&lt;String,Object>()<span style='color:#d2cd86; '>;</span>
json.put("hello", "world")<span style='color:#d2cd86; '>;</span>
precog.append("/foo/", json)<span style='color:#d2cd86; '>;</span>

<span style='color:#9999a9; '>// Upload a file</span>
File csvFile = new File("/path/to/my.csv")<span style='color:#d2cd86; '>;</span>
precog.uploadFile("/foo/", csvFile, Formats.CSV)<span style='color:#d2cd86; '>;</span>
                    </pre>
                </div>
                <div class="panel-content python-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Append a JSON value</span>
client<span style='color:#d2cd86; '>.</span>append<span style='color:#d2cd86; '>(</span><span style='color:#00c4c4; '>"/foo/"</span><span style='color:#d2cd86; '>,</span> <span style='color:#b060b0; '>{</span><span style='color:#00c4c4; '>"hello"</span><span style='color:#d2cd86; '>:</span> <span style='color:#00c4c4; '>"world"</span><span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span>

<span style='color:#9999a9; '>// Upload a file</span>
client<span style='color:#d2cd86; '>.</span>upload_file<span style='color:#d2cd86; '>(</span><span style='color:#00c4c4; '>'/foo/'</span><span style='color:#d2cd86; '>,</span> Format<span style='color:#d2cd86; '>.</span>json<span style='color:#d2cd86; '>,</span> <span style='color:#00c4c4; '>"/path/to/data.json"</span><span style='color:#d2cd86; '>)</span>
client<span style='color:#d2cd86; '>.</span>upload_file<span style='color:#d2cd86; '>(</span><span style='color:#00c4c4; '>'/foo/'</span><span style='color:#d2cd86; '>,</span> Format<span style='color:#d2cd86; '>.</span>csv<span style='color:#d2cd86; '>,</span> <span style='color:#e34adc; '>file</span><span style='color:#d2cd86; '>)</span>
                    </pre>
                </div>
                <div class="panel-content php-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Append a JSON value</span>
<span style='color:#ffffff; background:#281800; '>$api</span><span style='color:#d2cd86; background:#281800; '>-</span><span style='color:#d2cd86; background:#281800; '>></span><span style='color:#ffffff; background:#281800; '>store</span><span style='color:#d2cd86; background:#281800; '>(</span><span style='color:#00c4c4; background:#281800; '>'</span><span style='color:#02d045; background:#281800; '>/</span><span style='color:#00c4c4; background:#281800; '>foo</span><span style='color:#02d045; background:#281800; '>/</span><span style='color:#00c4c4; background:#281800; '>'</span><span style='color:#d2cd86; background:#281800; '>,</span><span style='color:#ffffff; background:#281800; '> </span><span style='color:#e66170; background:#281800; font-weight:bold; '>array</span><span style='color:#d2cd86; background:#281800; '>(</span><span style='color:#00c4c4; background:#281800; '>'hello'</span><span style='color:#ffffff; background:#281800; '> </span><span style='color:#d2cd86; background:#281800; '>=</span><span style='color:#d2cd86; background:#281800; '>></span><span style='color:#ffffff; background:#281800; '> </span><span style='color:#00c4c4; background:#281800; '>'world'</span><span style='color:#d2cd86; background:#281800; '>)</span><span style='color:#d2cd86; background:#281800; '>)</span><span style='color:#b060b0; background:#281800; '>;</span><span style='color:#ffffff; background:#281800; '></span>
<span style='color:#ffffff; background:#281800; '>&#xa0;</span>
<span style='color:#9999a9; '>// Upload a file</span>
<span style='color:#ffffff; background:#281800; '>$api</span><span style='color:#d2cd86; background:#281800; '>-</span><span style='color:#d2cd86; background:#281800; '>></span><span style='color:#ffffff; background:#281800; '>ingest</span><span style='color:#d2cd86; background:#281800; '>(</span><span style='color:#00c4c4; background:#281800; '>'/foo/data.json'</span><span style='color:#d2cd86; background:#281800; '>,</span><span style='color:#ffffff; background:#281800; '> </span><span style='color:#ffffff; background:#281800; '>$fileContent</span><span style='color:#d2cd86; background:#281800; '>,</span><span style='color:#ffffff; background:#281800; '> </span><span style='color:#00c4c4; background:#281800; '>'application/json'</span><span style='color:#d2cd86; background:#281800; '>)</span><span style='color:#b060b0; background:#281800; '>;</span><span style='color:#ffffff; background:#281800; '></span>
                    </pre>
                </div>
                <div class="panel-content ruby-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Append a JSON value</span>
Precog<span style='color:#d2cd86; '>.</span>append<span style='color:#d2cd86; '>(</span><span style='color:#b060b0; '>{</span>path: <span style='color:#00c4c4; '>'/foo/'</span>, value: <span style='color:#b060b0; '>{</span><span style='color:#00c4c4; '>"hello"</span>: <span style='color:#00c4c4; '>"world"</span><span style='color:#b060b0; '>}</span><span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span>;
precog<span style='color:#d2cd86; '>.</span>append<span style='color:#d2cd86; '>(</span><span style='color:#00c4c4; '>'/foo'</span>, <span style='color:#b060b0; '>{</span> :hello <span style='color:#d2cd86; '>=</span>> <span style='color:#00c4c4; '>'world'</span> <span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span>

<span style='color:#9999a9; '>// Upload a file</span>
Precog<span style='color:#d2cd86; '>.</span>uploadFile<span style='color:#d2cd86; '>(</span><span style='color:#b060b0; '>{</span>path: <span style='color:#00c4c4; '>'/foo/data.json'</span>, type: <span style='color:#00c4c4; '>'application/json'</span>, contents: file<span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span>;
precog<span style='color:#d2cd86; '>.</span>upload_file<span style='color:#d2cd86; '>(</span><span style='color:#00c4c4; '>'/foo/data.json'</span>, :json, file<span style='color:#d2cd86; '>)</span>
                    </pre>
                </div>
                <div class="panel-content nodejs-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Append a JSON value</span>
Precog<span style='color:#d2cd86; '>.</span>append<span style='color:#d2cd86; '>(</span><span style='color:#b060b0; '>{</span>path<span style='color:#b060b0; '>:</span> <span style='color:#00c4c4; '>'/foo/'</span><span style='color:#d2cd86; '>,</span> value<span style='color:#b060b0; '>:</span> <span style='color:#b060b0; '>{</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>hello</span><span style='color:#02d045; '>"</span><span style='color:#b060b0; '>:</span> <span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>world</span><span style='color:#02d045; '>"</span><span style='color:#b060b0; '>}</span><span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>

<span style='color:#9999a9; '>// Upload a file</span>
Precog<span style='color:#d2cd86; '>.</span>uploadFile<span style='color:#d2cd86; '>(</span><span style='color:#b060b0; '>{</span>path<span style='color:#b060b0; '>:</span> <span style='color:#00c4c4; '>'/foo/data.json'</span><span style='color:#d2cd86; '>,</span> type<span style='color:#b060b0; '>:</span> <span style='color:#00c4c4; '>'application/json'</span><span style='color:#d2cd86; '>,</span> contents<span style='color:#b060b0; '>:</span> file<span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>
                    </pre>
                </div>
                <div class="panel-content csharp-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Append a JSON value</span>
SomeStuff myStuff <span style='color:#d2cd86; '>=</span> SomeSource<span style='color:#d2cd86; '>.</span>GetStuff<span style='color:#d2cd86; '>(</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>foo</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>
client<span style='color:#d2cd86; '>.</span>Append<span style='color:#d2cd86; '>(</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>/test</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> myStuff<span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>

<span style='color:#9999a9; '>// Upload a file</span>
client<span style='color:#d2cd86; '>.</span>UploadFile<span style='color:#d2cd86; '>(</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>/test</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> Formats<span style='color:#d2cd86; '>.</span>CSV<span style='color:#d2cd86; '>,</span> @<span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>C:\somefile.csv</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>
                    </pre>
                </div>
                <ul class="first">
                    <li class="javascript">JavaScript</li>
                    <li class="java">Java</li>
                    <li class="python">Python</li>
                    <li class="php">PHP</li>
                    <li class="ruby">Ruby</li>
                    <li class="nodejs">NodeJS</li>
                    <li class="csharp">C#</li>
                </ul>
            </div>
            <div id="enrich" class="panel">
                <div class="active-content panel-content javascript-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Enrich a Data Set</span>
Precog<span style='color:#d2cd86; '>.</span>execute<span style='color:#d2cd86; '>(</span><span style='color:#00c4c4; '>'//foo with precog::enrichment(//foo, SentimentAnalysis)'</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>
                    </pre>
                </div>
                <div class="panel-content java-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Enrich a Data Set</span>
precog.query(<span style='color:#9999a9; '>"precog::enrichment(//foo, SentimentAnalysis)"</span>);
                    </pre>
                </div>
                <div class="panel-content python-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Enrich a Data Set</span>
client<span style='color:#d2cd86; '>.</span>query<span style='color:#d2cd86; '>(</span><span style='color:#00c4c4; '>'//foo with precog::enrichment(//foo, SentimentAnalysis)'</span><span style='color:#d2cd86; '>)</span>
                    </pre>
                </div>
                <div class="panel-content php-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Enrich a Data Set</span>
<span style='color:#ffffff; background:#281800; '>client</span><span style='color:#d2cd86; background:#281800; '>.</span><span style='color:#ffffff; background:#281800; '>query</span><span style='color:#d2cd86; background:#281800; '>(</span><span style='color:#00c4c4; background:#281800; '>'//foo with precog::enrichment(//foo, SentimentAnalysis)'</span><span style='color:#d2cd86; background:#281800; '>)</span><span style='color:#ffffff; background:#281800; '></span>
                    </pre>
                </div>
                <div class="panel-content ruby-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Enrich a Data Set</span>
precog<span style='color:#d2cd86; '>.</span>query<span style='color:#d2cd86; '>(</span><span style='color:#00c4c4; '>''</span>, <span style='color:#00c4c4; '>'//foo with precog::enrichment(//foo, SentimentAnalysis)'</span><span style='color:#d2cd86; '>)</span>
                    </pre>
                </div>
                <div class="panel-content nodejs-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Enrich a Data Set</span>
Precog<span style='color:#d2cd86; '>.</span>execute<span style='color:#d2cd86; '>(</span><span style='color:#00c4c4; '>'//foo with precog::enrichment(//foo, SentimentAnalysis)'</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>
                    </pre>
                </div>
                <div class="panel-content csharp-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Enrich a Data Set</span>
client<span style='color:#d2cd86; '>.</span>Query<span style='color:#d2cd86; '>(</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>/</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>//foo with precog::enrichment(//foo, SentimentAnalysis)</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>
                    </pre>
                </div>
                <ul class="first">
                    <li class="javascript">JavaScript</li>
                    <li class="java">Java</li>
                    <li class="python">Python</li>
                    <li class="php">PHP</li>
                    <li class="ruby">Ruby</li>
                    <li class="nodejs">NodeJS</li>
                    <li class="csharp">C#</li>
                </ul>
            </div>
            <div id="analyze" class="panel">
                <div class="active-content panel-content javascript-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Compute Some Analytics</span>
Precog<span style='color:#d2cd86; '>.</span>execute<span style='color:#d2cd86; '>(</span><span style='color:#00c4c4; '>'count(//foo)'</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>
                    </pre>
                </div>
                <div class="panel-content java-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Compute Some Analytics</span>
precog.query(<span style='color:#9999a9; '>"count(//foo)"</span>);
                    </pre>
                </div>
                <div class="panel-content python-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Compute Some Analytics</span>
client<span style='color:#d2cd86; '>.</span>query<span style='color:#d2cd86; '>(</span><span style='color:#00c4c4; '>'count(//foo)'</span><span style='color:#d2cd86; '>)</span>
                    </pre>
                </div>
                <div class="panel-content php-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Compute Some Analytics</span>
<span style='color:#ffffff; background:#281800; '>$api</span><span style='color:#d2cd86; background:#281800; '>-</span><span style='color:#d2cd86; background:#281800; '>></span><span style='color:#ffffff; background:#281800; '>query</span><span style='color:#d2cd86; background:#281800; '>(</span><span style='color:#00c4c4; background:#281800; '>'count(//foo)'</span><span style='color:#d2cd86; background:#281800; '>)</span><span style='color:#b060b0; background:#281800; '>;</span><span style='color:#ffffff; background:#281800; '></span>
                    </pre>
                </div>
                <div class="panel-content ruby-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Compute Some Analytics</span>
Precog<span style='color:#d2cd86; '>.</span>execute<span style='color:#d2cd86; '>(</span><span style='color:#00c4c4; '>'count(//foo)'</span><span style='color:#d2cd86; '>)</span>;
precog<span style='color:#d2cd86; '>.</span>query<span style='color:#d2cd86; '>(</span><span style='color:#00c4c4; '>''</span>, <span style='color:#00c4c4; '>'count(//foo)'</span><span style='color:#d2cd86; '>)</span>
                    </pre>
                </div>
                <div class="panel-content nodejs-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Compute Some Analytics</span>
Precog<span style='color:#d2cd86; '>.</span>execute<span style='color:#d2cd86; '>(</span><span style='color:#00c4c4; '>'count(//foo)'</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>
                    </pre>
                </div>
                <div class="panel-content csharp-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Compute Some Analytics</span>
client<span style='color:#d2cd86; '>.</span>Query<span style='color:#d2cd86; '>&lt;</span><span style='color:#e66170; font-weight:bold; '>int</span><span style='color:#d2cd86; '>></span><span style='color:#d2cd86; '>(</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>/</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>count(//foo)</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>)</span><span style='color:#d2cd86; '>.</span>Data<span style='color:#d2cd86; '>[</span><span style='color:#008c00; '>0</span><span style='color:#d2cd86; '>]</span><span style='color:#b060b0; '>;</span>
                    </pre>
                </div>
                <ul class="first">
                    <li class="javascript">JavaScript</li>
                    <li class="java">Java</li>
                    <li class="python">Python</li>
                    <li class="php">PHP</li>
                    <li class="ruby">Ruby</li>
                    <li class="nodejs">NodeJS</li>
                    <li class="csharp">C#</li>
                </ul>
            </div>
            <div id="visualize" class="panel">
                <div class="active-content panel-content barchart-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
ReportGrid<span style='color:#d2cd86; '>.</span>barChart<span style='color:#d2cd86; '>(</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>#chart</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#b060b0; '>{</span>
  axes <span style='color:#b060b0; '>:</span> <span style='color:#d2cd86; '>[</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>country</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>count</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>]</span><span style='color:#d2cd86; '>,</span>
  datapoints <span style='color:#b060b0; '>:</span> data<span style='color:#d2cd86; '>(</span><span style='color:#d2cd86; '>)</span><span style='color:#d2cd86; '>,</span>
  options <span style='color:#b060b0; '>:</span> <span style='color:#b060b0; '>{</span>
    displayrules <span style='color:#b060b0; '>:</span> <span style='color:#0f4d75; '>true</span>
  <span style='color:#b060b0; '>}</span>
<span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span></pre>
                </div>
                <div class="panel-content funnelchart-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
ReportGrid<span style='color:#d2cd86; '>.</span>funnelChart<span style='color:#d2cd86; '>(</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>#chart</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#b060b0; '>{</span>
  axes <span style='color:#b060b0; '>:</span> <span style='color:#d2cd86; '>[</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>event</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>count</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>]</span><span style='color:#d2cd86; '>,</span>
  datapoints <span style='color:#b060b0; '>:</span> data<span style='color:#d2cd86; '>(</span><span style='color:#d2cd86; '>)</span>
<span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span></pre>
                </div>
                <div class="panel-content geo-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
ReportGrid<span style='color:#d2cd86; '>.</span>geo<span style='color:#d2cd86; '>(</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>#chart</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#b060b0; '>{</span>
  axes <span style='color:#b060b0; '>:</span> <span style='color:#d2cd86; '>[</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>code</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>summerGold</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>]</span><span style='color:#d2cd86; '>,</span>
  datapoints <span style='color:#b060b0; '>:</span> data<span style='color:#d2cd86; '>(</span><span style='color:#d2cd86; '>)</span><span style='color:#d2cd86; '>,</span>
  options <span style='color:#b060b0; '>:</span> <span style='color:#b060b0; '>{</span>
    map <span style='color:#b060b0; '>:</span> <span style='color:#b060b0; '>{</span>
      template <span style='color:#b060b0; '>:</span> <span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>world</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span>
      property <span style='color:#b060b0; '>:</span> <span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>code</span><span style='color:#02d045; '>"</span>
    <span style='color:#b060b0; '>}</span>
  <span style='color:#b060b0; '>}</span>
<span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span></pre>
                </div>
                <div class="panel-content heatgrid-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
ReportGrid<span style='color:#d2cd86; '>.</span>heatGrid<span style='color:#d2cd86; '>(</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>#chart</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#b060b0; '>{</span>
  axes <span style='color:#b060b0; '>:</span> <span style='color:#d2cd86; '>[</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>race</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>year</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>deathRate</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>]</span><span style='color:#d2cd86; '>,</span>
  datapoints <span style='color:#b060b0; '>:</span> data<span style='color:#d2cd86; '>(</span><span style='color:#d2cd86; '>)</span><span style='color:#d2cd86; '>,</span>
  options <span style='color:#b060b0; '>:</span> <span style='color:#b060b0; '>{</span>
    color <span style='color:#b060b0; '>:</span> <span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>i:#00f,#0ff,#0f0,#ff0,#f00</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span>
    <span style='color:#b060b0; '>}</span>
  <span style='color:#b060b0; '>}</span>
<span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span></pre>
                </div>
                <div class="panel-content leaderboard-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
ReportGrid<span style='color:#d2cd86; '>.</span>leaderBoard<span style='color:#d2cd86; '>(</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>#chart</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#b060b0; '>{</span>
  axes <span style='color:#b060b0; '>:</span> <span style='color:#d2cd86; '>[</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>country</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>count</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>]</span><span style='color:#d2cd86; '>,</span>
  data <span style='color:#b060b0; '>:</span> data<span style='color:#d2cd86; '>(</span><span style='color:#d2cd86; '>)</span>
<span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span></pre>
                </div>
                <div class="panel-content linechart-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
ReportGrid<span style='color:#d2cd86; '>.</span>lineChart<span style='color:#d2cd86; '>(</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>#chart</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#b060b0; '>{</span>
  axes <span style='color:#b060b0; '>:</span> <span style='color:#d2cd86; '>[</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>year</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>population</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>]</span><span style='color:#d2cd86; '>,</span>
  datapoints <span style='color:#b060b0; '>:</span> data<span style='color:#d2cd86; '>(</span><span style='color:#d2cd86; '>)</span><span style='color:#d2cd86; '>,</span>
<span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span></pre>
                </div>
                <div class="panel-content piechart-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
ReportGrid<span style='color:#d2cd86; '>.</span>pieChart<span style='color:#d2cd86; '>(</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>#chart</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#b060b0; '>{</span>
  axes <span style='color:#b060b0; '>:</span> <span style='color:#d2cd86; '>[</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>count</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>]</span><span style='color:#d2cd86; '>,</span>
  datapoints <span style='color:#b060b0; '>:</span> data<span style='color:#d2cd86; '>(</span><span style='color:#d2cd86; '>)</span><span style='color:#d2cd86; '>,</span>
  options <span style='color:#b060b0; '>:</span> <span style='color:#b060b0; '>{</span>
      datapoint <span style='color:#b060b0; '>:</span> <span style='color:#e66170; font-weight:bold; '>function</span><span style='color:#d2cd86; '>(</span>dp<span style='color:#d2cd86; '>)</span> <span style='color:#b060b0; '>{</span> <span style='color:#e66170; font-weight:bold; '>return</span> dp<span style='color:#d2cd86; '>.</span>country<span style='color:#b060b0; '>;</span> <span style='color:#b060b0; '>}</span>
    <span style='color:#b060b0; '>}</span>
  <span style='color:#b060b0; '>}</span>
<span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>
                    </pre>
                </div>
                <div class="panel-content pivottable-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
ReportGrid<span style='color:#d2cd86; '>.</span>pivotTable<span style='color:#d2cd86; '>(</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>#chart</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#b060b0; '>{</span>
  axes <span style='color:#b060b0; '>:</span> <span style='color:#d2cd86; '>[</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>model</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>quarter</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>market</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>value</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>]</span><span style='color:#d2cd86; '>,</span>
  datapoints <span style='color:#b060b0; '>:</span> data<span style='color:#d2cd86; '>(</span><span style='color:#d2cd86; '>)</span>
<span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span></pre>
                </div>
                <div class="panel-content sankey-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
ReportGrid<span style='color:#d2cd86; '>.</span>sankey<span style='color:#d2cd86; '>(</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>#chart</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#b060b0; '>{</span>
  axes <span style='color:#b060b0; '>:</span> <span style='color:#d2cd86; '>[</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>billions</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>]</span><span style='color:#d2cd86; '>,</span>
  datapoints <span style='color:#b060b0; '>:</span> data<span style='color:#d2cd86; '>(</span><span style='color:#d2cd86; '>)</span><span style='color:#d2cd86; '>,</span>
  options <span style='color:#b060b0; '>:</span> <span style='color:#b060b0; '>{</span>
    layerwidth <span style='color:#b060b0; '>:</span> <span style='color:#008c00; '>130</span>
  <span style='color:#b060b0; '>}</span>
<span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span></pre>
                </div>
                <div class="panel-content scattergraph-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
ReportGrid<span style='color:#d2cd86; '>.</span>scatterGraph<span style='color:#d2cd86; '>(</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>#chart</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#b060b0; '>{</span>
  axes <span style='color:#b060b0; '>:</span> <span style='color:#d2cd86; '>[</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>year</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>deathRate</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>]</span><span style='color:#d2cd86; '>,</span>
  datapoints <span style='color:#b060b0; '>:</span> data<span style='color:#d2cd86; '>(</span><span style='color:#d2cd86; '>)</span><span style='color:#d2cd86; '>,</span>
<span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span></pre>
                </div>
                <div class="panel-content streamgraphc-content">
                    <pre style='color:#d1d1d1;background:#000000;'>
ReportGrid<span style='color:#d2cd86; '>.</span>streamGraph<span style='color:#d2cd86; '>(</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>#chart</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#b060b0; '>{</span>
  axes <span style='color:#b060b0; '>:</span> <span style='color:#d2cd86; '>[</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>year</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> <span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>deathRate</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>]</span><span style='color:#d2cd86; '>,</span>
  datapoints <span style='color:#b060b0; '>:</span> data<span style='color:#d2cd86; '>(</span><span style='color:#d2cd86; '>)</span><span style='color:#d2cd86; '>,</span>
<span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span></pre>
                </div>
                <ul class="first-alt">
                    <li class="barchart">Bar Chart</li>
                    <li class="funnelchart">Funnel Chart</li>
                    <li class="geo">Geo</li>
                    <li class="heatgrid">HeatGrid</li>
                    <li class="leaderboard">Leader Board</li>
                    <li class="linechart">Line Chart</li>
                    <li class="piechart">Pie Chart</li>
                    <li class="pivottable">Pivot Table</li>
                    <li class="sankey">Sankey</li>
                    <li class="scattergraph">Scatter Graph</li>
                    <li class="streamgraphc">Stream Graph</li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="section-divider">
    <h2>Features</h2>
</div>
<div id="body-features">
    <div class="holder">
        <div class="two-columns">
            <ul>
                <li class="dark-background">
                    <h3>JSON Certified</h3>
                    <p>Precog can store any kind of JSON data, from primitive values, to records, to complex, large documents with lots of nested objects and arrays.</p>
                </li>
                <li class="dark-background">
                    <h3>No Schema</h3>
                    <p>Precog does not impose any schema on your data. Every value you store in Precog can be different from every other value.</p>
                </li>
                <li class="dark-background">
                    <h3>Flexible Deployment</h3>
                    <p>Precog comes in a hardware appliance, a virtual appliance, and a managed cloud offering, so you can choose the deployment option that's right for you.</p>
                </li>
                <li class="dark-background">
                    <h3>Client Libraries</h3>
                    <p>Precog comes with client libraries for Java, C#, Python, PHP, JavaScript, Python, and Ruby, all bundled up, documented, and ready to go.</p>
                </li>
                <li class="dark-background">
                    <h3>Simple Query Language</h3>
                    <p>Precog supports Quirrel, a simple query language designed for analyzing JSON data, which you can learn in 30 minutes.</p>
                </li>
                <li class="dark-background">
                    <h3>Advanced Analytics</h3>
                    <p>Quirrel lets you do everything that SQL can do, and much more, including statistical analysis and easy machine learning.</p>
                </li>
                <li class="dark-background">
                    <h3>Visual Query Builder</h3>
                    <p>Build queries on your JSON data with Labcoat (a visual query builder), and export them as code you can run in the programming language of your choice.</p>
                </li>
                <li class="dark-background">
                    <h3>Easy Charts</h3>
                    <p>Precog comes with a powerful charting library, but is also compatible with D3, Highcharts, Google Charts, and most other charting libraries.</p>
                </li>
                <li class="dark-background">
                    <h3>Secure by Default</h3>
                    <p>Precog lets you create API keys with different levels of permission so you can easily build multi-tenant analytics solutions on top of Precog.</p>
                </li>
                <li class="dark-background">
                    <h3>Whiteglove Treatment</h3>
                    <p>Every Precog customer receives unlimited email, phone, and IRC support. Large or small, our mission is to help you succeed.</p>
                </li>
            </ul>
            <div class="clear-left"></div>
        </div>
        <div class="two-columns-end">
            <div class="very-dark-background">
                <h2>Other Resources</h2>
                <a href="/developers/">Developer Center</a>
                <p>The Developer Center is the launchpad for building applications using Precog. You'll find API docs, client libraries, and more.</p>
                
                <a href="/developers/how-tos/common-analytics/">Common Analytics</a>
                <p>This is a short guide that shows how to perform very common analytical queries using the Quirrel query language.</p>
                
                <a href="/developers/how-tos/embed-reporting/">Embed Reporting</a>
                <p>If you're building a business application, then your customers probably want self-service reporting.</p>

                <a href="/developers/how-tos/optimize-performance/">Optimize Performance</a>
                <p>If you are deploying a production application that uses Precog, you may be interested in ways to optimize the runtime query performance.</p>
                
                <a href="/for-developers/mongodb/">Precog for MongoDB</a>
                <p>Try an experimental version of precog running on your MongoDB database.</p>
            </div>
        </div>
        <div class="clear-left"></div>
    </div>
</div>
<div class="section-divider">
    <h2>Getting Started</h2>
</div>
<div id="body-getting-started">
    <div class="holder">
        <h2><span>1</span>Sign up for a free Precog Account!</h2>
        <h2><span>2</span>Get a client library in your favorite programming language.</h2>
        <ul>
            <li class="dark-background"><a href="https://web4.precog.com/developers/client-libraries/#JavaScript" target="_blank">JavaScript</a></li>
            <li class="dark-background"><a href="https://web4.precog.com/developers/client-libraries/#Java" target="_blank">Java</a></li>
            <li class="dark-background"><a href="https://web4.precog.com/developers/client-libraries/#Python" target="_blank">Python</a></li>
            <li class="dark-background"><a href="https://web4.precog.com/developers/client-libraries/#PHP" target="_blank">PHP</a></li>
            <li class="dark-background"><a href="https://web4.precog.com/developers/client-libraries/#Ruby" target="_blank">Ruby</a></li>
            <li class="dark-background"><a href="https://web4.precog.com/developers/client-libraries/#NodeJS" target="_blank">NodeJS</a></li>
            <li class="dark-background"><a href="https://web4.precog.com/developers/client-libraries/#C#/.NET" target="_blank">C#</a></li>
        </ul>
        <div class="clear-left"></div>
        <h2><span>3</span>Write a couple lines of code to upload or stream data into Precog.</h2>
        <div id="simple-code-box">
            <div id="javascript-code" class="code-panel active-content">
                <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Append a JSON value</span>
Precog<span style='color:#d2cd86; '>.</span>append<span style='color:#d2cd86; '>(</span><span style='color:#b060b0; '>{</span>path<span style='color:#b060b0; '>:</span> <span style='color:#00c4c4; '>'/foo/'</span><span style='color:#d2cd86; '>,</span> value<span style='color:#b060b0; '>:</span> <span style='color:#b060b0; '>{</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>hello</span><span style='color:#02d045; '>"</span><span style='color:#b060b0; '>:</span> <span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>world</span><span style='color:#02d045; '>"</span><span style='color:#b060b0; '>}</span><span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>

<span style='color:#9999a9; '>// Upload a file</span>
Precog<span style='color:#d2cd86; '>.</span>uploadFile<span style='color:#d2cd86; '>(</span><span style='color:#b060b0; '>{</span>path<span style='color:#b060b0; '>:</span> <span style='color:#00c4c4; '>'/foo/data.json'</span><span style='color:#d2cd86; '>,</span> type<span style='color:#b060b0; '>:</span> <span style='color:#00c4c4; '>'application/json'</span><span style='color:#d2cd86; '>,</span> contents<span style='color:#b060b0; '>:</span> file<span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>
                </pre>
            </div>
            <div id="java-code" class="code-panel">
                <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Append a JSON value</span>
Map&lt;String,Object> json = new HashMap&lt;String,Object>()<span style='color:#d2cd86; '>;</span>
json.put("hello", "world")<span style='color:#d2cd86; '>;</span>
precog.append("/foo/", json)<span style='color:#d2cd86; '>;</span>

<span style='color:#9999a9; '>// Upload a file</span>
File csvFile = new File("/path/to/my.csv")<span style='color:#d2cd86; '>;</span>
precog.uploadFile("/foo/", csvFile, Formats.CSV)<span style='color:#d2cd86; '>;</span>
                </pre>
            </div>
            <div id="python-code" class="code-panel">
                <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '># append json value (python object)</span>
client<span style='color:#d2cd86; '>.</span>append<span style='color:#d2cd86; '>(</span><span style='color:#00c4c4; '>"/foo/"</span><span style='color:#d2cd86; '>,</span> <span style='color:#b060b0; '>{</span><span style='color:#00c4c4; '>"hello"</span><span style='color:#d2cd86; '>:</span> <span style='color:#00c4c4; '>"world"</span><span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span>

<span style='color:#9999a9; '># upload file</span>
client<span style='color:#d2cd86; '>.</span>upload_file<span style='color:#d2cd86; '>(</span><span style='color:#00c4c4; '>'/foo/'</span><span style='color:#d2cd86; '>,</span> Format<span style='color:#d2cd86; '>.</span>json<span style='color:#d2cd86; '>,</span> <span style='color:#00c4c4; '>"/path/to/data.json"</span><span style='color:#d2cd86; '>)</span>
client<span style='color:#d2cd86; '>.</span>upload_file<span style='color:#d2cd86; '>(</span><span style='color:#00c4c4; '>'/foo/'</span><span style='color:#d2cd86; '>,</span> Format<span style='color:#d2cd86; '>.</span>csv<span style='color:#d2cd86; '>,</span> <span style='color:#e34adc; '>file</span><span style='color:#d2cd86; '>)</span>
                </pre>
            </div>
            <div id="php-code" class="code-panel">
                <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Append a JSON value</span>
<span style='color:#ffffff; background:#281800; '>$api</span><span style='color:#d2cd86; background:#281800; '>-</span><span style='color:#d2cd86; background:#281800; '>></span><span style='color:#ffffff; background:#281800; '>store</span><span style='color:#d2cd86; background:#281800; '>(</span><span style='color:#00c4c4; background:#281800; '>'</span><span style='color:#02d045; background:#281800; '>/</span><span style='color:#00c4c4; background:#281800; '>foo</span><span style='color:#02d045; background:#281800; '>/</span><span style='color:#00c4c4; background:#281800; '>'</span><span style='color:#d2cd86; background:#281800; '>,</span><span style='color:#ffffff; background:#281800; '> </span><span style='color:#e66170; background:#281800; font-weight:bold; '>array</span><span style='color:#d2cd86; background:#281800; '>(</span><span style='color:#00c4c4; background:#281800; '>'hello'</span><span style='color:#ffffff; background:#281800; '> </span><span style='color:#d2cd86; background:#281800; '>=</span><span style='color:#d2cd86; background:#281800; '>></span><span style='color:#ffffff; background:#281800; '> </span><span style='color:#00c4c4; background:#281800; '>'world'</span><span style='color:#d2cd86; background:#281800; '>)</span><span style='color:#d2cd86; background:#281800; '>)</span><span style='color:#b060b0; background:#281800; '>;</span><span style='color:#ffffff; background:#281800; '></span>
<span style='color:#ffffff; background:#281800; '>&#xa0;</span>
<span style='color:#9999a9; '>// Upload a file</span>
<span style='color:#ffffff; background:#281800; '>$api</span><span style='color:#d2cd86; background:#281800; '>-</span><span style='color:#d2cd86; background:#281800; '>></span><span style='color:#ffffff; background:#281800; '>ingest</span><span style='color:#d2cd86; background:#281800; '>(</span><span style='color:#00c4c4; background:#281800; '>'/foo/data.json'</span><span style='color:#d2cd86; background:#281800; '>,</span><span style='color:#ffffff; background:#281800; '> </span><span style='color:#ffffff; background:#281800; '>$fileContent</span><span style='color:#d2cd86; background:#281800; '>,</span><span style='color:#ffffff; background:#281800; '> </span><span style='color:#00c4c4; background:#281800; '>'application/json'</span><span style='color:#d2cd86; background:#281800; '>)</span><span style='color:#b060b0; background:#281800; '>;</span><span style='color:#ffffff; background:#281800; '></span>
                </pre>
            </div>
            <div id="ruby-code" class="code-panel">
                <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#d2cd86; '>/</span><span style='color:#d2cd86; '>/</span> Append a JSON value
Precog<span style='color:#d2cd86; '>.</span>append<span style='color:#d2cd86; '>(</span><span style='color:#b060b0; '>{</span>path: <span style='color:#00c4c4; '>'/foo/'</span>, value: <span style='color:#b060b0; '>{</span><span style='color:#00c4c4; '>"hello"</span>: <span style='color:#00c4c4; '>"world"</span><span style='color:#b060b0; '>}</span><span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span>;
precog<span style='color:#d2cd86; '>.</span>append<span style='color:#d2cd86; '>(</span><span style='color:#00c4c4; '>'/foo'</span>, <span style='color:#b060b0; '>{</span> :hello <span style='color:#d2cd86; '>=</span>> <span style='color:#00c4c4; '>'world'</span> <span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span>

<span style='color:#d2cd86; '>/</span><span style='color:#d2cd86; '>/</span> Upload a file
Precog<span style='color:#d2cd86; '>.</span>uploadFile<span style='color:#d2cd86; '>(</span><span style='color:#b060b0; '>{</span>path: <span style='color:#00c4c4; '>'/foo/data.json'</span>, type: <span style='color:#00c4c4; '>'application/json'</span>, contents: file<span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span>;
precog<span style='color:#d2cd86; '>.</span>upload_file<span style='color:#d2cd86; '>(</span><span style='color:#00c4c4; '>'/foo/data.json'</span>, :json, file<span style='color:#d2cd86; '>)</span>
                </pre>
            </div>
            <div id="nodejs-code" class="code-panel">
                <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// Append a JSON value</span>
Precog<span style='color:#d2cd86; '>.</span>append<span style='color:#d2cd86; '>(</span><span style='color:#b060b0; '>{</span>path<span style='color:#b060b0; '>:</span> <span style='color:#00c4c4; '>'/foo/'</span><span style='color:#d2cd86; '>,</span> value<span style='color:#b060b0; '>:</span> <span style='color:#b060b0; '>{</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>hello</span><span style='color:#02d045; '>"</span><span style='color:#b060b0; '>:</span> <span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>world</span><span style='color:#02d045; '>"</span><span style='color:#b060b0; '>}</span><span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>

<span style='color:#9999a9; '>// Upload a file</span>
Precog<span style='color:#d2cd86; '>.</span>uploadFile<span style='color:#d2cd86; '>(</span><span style='color:#b060b0; '>{</span>path<span style='color:#b060b0; '>:</span> <span style='color:#00c4c4; '>'/foo/data.json'</span><span style='color:#d2cd86; '>,</span> type<span style='color:#b060b0; '>:</span> <span style='color:#00c4c4; '>'application/json'</span><span style='color:#d2cd86; '>,</span> contents<span style='color:#b060b0; '>:</span> file<span style='color:#b060b0; '>}</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>
                </pre>
            </div>
            <div id="csharp-code" class="code-panel">
                <pre style='color:#d1d1d1;background:#000000;'>
<span style='color:#9999a9; '>// This assumes a SomeSource that can generate SomeStuff instances</span>
SomeStuff myStuff <span style='color:#d2cd86; '>=</span> SomeSource<span style='color:#d2cd86; '>.</span>GetStuff<span style='color:#d2cd86; '>(</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>foo</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>
client<span style='color:#d2cd86; '>.</span>Append<span style='color:#d2cd86; '>(</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>/test</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> myStuff<span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>

<span style='color:#9999a9; '>// Uploading a file means we replace (e.g. delete) the existing data at that path</span>
client<span style='color:#d2cd86; '>.</span>UploadFile<span style='color:#d2cd86; '>(</span><span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>/test</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>,</span> Formats<span style='color:#d2cd86; '>.</span>CSV<span style='color:#d2cd86; '>,</span> @<span style='color:#02d045; '>"</span><span style='color:#00c4c4; '>C:\somefile.csv</span><span style='color:#02d045; '>"</span><span style='color:#d2cd86; '>)</span><span style='color:#b060b0; '>;</span>
                </pre>
            </div>
            <ul class="first">
                <li class="javascript">JavaScript</li>
                <li class="java">Java</li>
                <li class="python">Python</li>
                <li class="php">PHP</li>
                <li class="ruby">Ruby</li>
                <li class="nodejs">NodeJS</li>
                <li class="csharp">C#</li>
            </ul>
        </div>
        <h2><span>4</span>Launch Labcoat, the visual query builder, to build queries and export them as code.</h2>
        <a href="http://labcoat.precog.com" class="red-background mini-button" target="_blank">Launch Labcoat</a>
        <h2><span>5</span>Check out our developer center when you need to do something more advanced.</h2>
        <a href="/developers/getting-started/overview/" class="blue-background mini-button" target="_blank">Developer Center</a>
    </div>
</div>
<div class="section-divider">
    <h2>Learn More</h2>
</div>
<div id="body-contactus">
    <div class="holder">
        <div class="three-columns">
            <h2>Contact Us</h2>
        </div>
        <div class="three-columns">
            <h2>Developer Resources</h2>
        </div>
        <div class="three-columns-end">
            
        </div>
        <div class="clear-left">
        </div>
    </div>
</div>
<div class="section-divider">
    <h2>Pricing</h2>
</div>
<div id="body-download">
    <div class="holder">
        <div class="three-columns">
            <h3>Windows</h3>
            <img src="/images/graphic-download-windows.png" alt="windows">
        </div>
        <div class="three-columns">
            <h3>Mac</h3>
            <img src="/images/graphic-download-mac.png" alt="windows">
        </div>
        <div class="three-columns-end">
            <h3>Linux</h3>
            <img src="/images/graphic-download-linux.png" alt="windows">
        </div>
        <div class="clear-left"></div>
    </div>
</div>
