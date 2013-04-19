title: Labcoat Cloud
author: Matthew De Goes
date: 2013-03-26 12:20
template: page-devcntr.jade

<div id="body">
    <span class="page-title">Developer Center</span>
    <h1>How To</h1>
    <h2>Embed Reporting in Your App for Your Customers</h2>
    <p>Check out a demo dashboard <a href="http://www2.precog.com/socialsaucedashboard">here</a>.</p>
    <h3>Overview</h3>
    <p>If you&Otilde;re building a business application, then your customers probably want self-service reporting. Most business applications, from marketing tools to advertising platforms, have full-featured reporting built into them. Precog makes it easy to build this kind of functionality directly into your application, without spending a lot of time or money.</p>
    <p>This document provides a step-by-step guide to embed analytics and charts into an online dashboard. Code is provided every step of the way. So, if you follow along, at the end of the tutorial you&Otilde;ll have a fully-functioning reporting dashboard that you can embed in your application, for your customers. You can also see what the <a href="http://www.precog.com/external/Tutorials/apocalypsetutorial/ApocalypseProductsDashboard.htm">final result</a> looks like.</p>
    <p>This tutorial follows two fictitious companies: NimbleSell and Apocalypse Products. NimbleSell is a platform that allows individual merchants to sign up for online storefronts.</p>
    <p>Apocalypse Products is one of the merchants using the NimbleSell platform to power its online storefront presence. Apocalypse Products wants a clean and efficient reporting dashboard that gives them insight into how to run their storefront better.</p>
    <ul>
        <li>Order status (paid, authorized, pending, refunded, voided, abandoned)</li>
        <li>Fulfillment status (unshipped, partial, shipped)</li>
        <li>Product name, price, SKU, vendor, type</li>
        <li>How customers found the storefront (URL referral, search terms used)</li>
        <li>Where customers are located</li>
        <li>Page hits and unique visitors</li>
    </ul>
    <p>For the remainder of the tutorial, let&Otilde;s imagine that you&Otilde;re NimbleSell and that you&Otilde;re looking to provide all of the above features to your customers (the merchants who use your platform).</p>
    <p>To go from nothing to offering self-service reporting for your customers, you need to create a Precog account (to get an API key). You can use your master API key to create customized keys for every customer (including Apocalypse Products). You can then instrument your platform so data starts flowing to Precog, as well as back import historical data. After these steps have been completed, all that remains is to create insightful queries and pipe those queries into a reporting dashboard embedded in the NimbleSell platform.</p>
    <p>These steps will be covered in depth in the sections that follow.</p>
    <h3>Step 1: Create a Precog Account</h3>
    <p>Sign up for a <a href="http://www.precog.com/account/login/">Precog account</a>. After you sign up, you&Otilde;ll be given an API key and an account Id number that serves as your root path. These provide you access to the Precog REST API.</p>
    <p>An API key is essentially a secure combination of username and password, which gives you some permissions to use the API in various ways. For more information, visit the <a href="http://www.precog.com/developers">developer center</a>.</p>
    <p>A root path is the main directory where your Precog data is located. The root path is how you tell the Precog API where to look for your data. Your root path is your account Id number.</p>
    <p>NimbleSell&Otilde;s root path might be:</p>
    <p>/0000110734/</p>
    <p>You can access your account information at the <a href="http://www.precog.com/account">account page</a>. In addition to your API key and root path there is a link to your personalized version of Precog&Otilde;s interactive analysis tool: Labcoat. You can also check out a <a href="https://labcoat.precog.com/">preview version of Labcoat</a> loaded with sample data, including the data used in this tutorial.</p>
    <h3>Step 2: Organize Your Data</h3>
    <p>Before you start loading and analyzing data with Precog, it&Otilde;s best to figure out how to organize that data. This organizational structure can be as flexible as your company needs.</p>
    <p>One common pattern, which would work well for NimbleSell, is to organize each of your customer&Otilde;s data into a separate directory. For example:</p>
    <pre>
/0000110734/apocalypseproducts
/0000110734/someothercustomer
/0000110734/anothercustomer    
    </pre>
    <p>This way of organizing the data makes it easy for you to give each customer permissions to see their own data, but not to see data from any other customer.</p>
    <p>For example, the custom API key that you provide to Apocalypse Products allows Apocalypse Products to load data from /0000110734/<em>apocalypseproducts</em> but not from /0000110734/<em>someothercustomer</em>.</p>
    <p><em>If a user has appropriate access, queries can analyze data across many folders, so creating an organizational division does not necessarily create data silos. For example, you have access to "/0000110734/", so you can run queries across all of the subdirectories of "/0000110734/" without restriction.</em></p>
    <h3>Step 3: Create New API Keys for Your Customers</h3>
    <p>The master API key you get when you sign up for an account will have many grants. It will be able to read and write data into any child path or your root path. Since you do not want to give Apocalypse Products access to your internal data or the data of your other customers, you need to create a new API key for them.</p>
    <p>You can create new API keys using the <a href="http://www.precog.com/api-security">security API</a> directly or you can use a <a href="https://github.com/reportgrid/client-libraries/tree/master/precog">client library</a>. For example, you want to create an API key for Apocalypse Products that gives them read and write access to the path /0000110734/apocalypseproducts/. You need to use the API key you were assigned upon creating your Precog account as the authorizing API key.</p>
    <p>All API calls require an analytics service endpoint. The current default is: https://beta.precog.com/. For reference, this endpoint is listed as the analytics service on your <a href="http://www.precog.com/account">account page</a>.</p>
    <p>The create API key call documented as:</p>
    <pre>
POST /security/v1/apikeys/?apiKey=[auth API key]   
    </pre>
    <p>becomes:</p>
    <pre>
POST https://beta.precog.com/security/v1/apikeys/?apiKey=[auth API key]  
    </pre>
    <p>This API call also requires a request body that provides details about the grants the API key will possess. This call only grants read access to the data.</p>
    <pre>
{
  "name": &Eacute;
  "description": &Eacute;
  "grants": [{
   "name": &Eacute;
   "description": &Eacute;
   "parentIds": &Eacute;
   "expirationDate": &Eacute;
   "permissions" : [{
     "accessType": "read",
     "path": "/0000110734/apocalypseproducts/",
     "ownerAccountId": "0000110734"
   }, &Eacute;
   ]
  }, &Eacute;
  ]
}
    </pre>
    <p>The API call returns an object containing the new API key:</p>
    <pre>
{"apiKey": "[API key]"} 
    </pre>
    <p>You would then store this API key in whatever database you use to keep track of your customers. For example, if you have a customers table that you use to keep track of all of your customers, then you could add a precogApiKey column to this table, which would let you store a custom API key for each of your customers (this is a Precog-recommended Best Practice).</p>
    <p>You will later use this customer-specific API key to deploy a secure reporting dashboard for each of your customers (including Apocalypse Products). You could also give these API keys directly to your customers if you wanted to allow them to explore their data directly (through Labcoat or ReportGrid).</p>
    <p>For more information on the Accounts API and Client Libraries see the <a href="http://www.precog.com/developers">developer center</a>.</p>
    <h3>Step 4: Instrumenting Your Application</h3>
    <p>Adding self-service reporting to your platform requires piping all the data flowing through your platform into Precog, where it can be analyzed and displayed in charts. This step is called instrumentation, and it&Otilde;s one of the most important steps to integrating Precog.</p>
    <p>In addition to organizing data using the file system, it&Otilde;s important to figure out what data to store and how it should be represented. Usually, this data will be event-oriented in nature, capturing what users are doing. In your case, it will include information on what products customers are searching for, looking at, and buying, and where customers are coming from.</p>
    <p>This section will include a brief overview of the Precog REST API and an explanation of how to hook your current data stream into Precog API. You can find a brief screencast tutorial about instrumenting your application <a href="http://www.youtube.com/watch?v=rXSrl0ozSH8">here on YouTube</a>. Importing historical data that you may already be storing in a different data system will be covered in Step 5.</p>
    <p>Here are a few activities that you may want to log to the Precog API:</p>
    <ul>
      <li>Customer adds an item to shopping cart</li>
      <li>Customer removes an item from shopping cart</li>
      <li>Customer confirms order</li>
      <li>Order gets shipped</li>
    </ul>
    <p>The first three are examples of front-end instrumentation, meaning they occur on the client side. The last is an example of back-end instrumentation, meaning it occurs on the server side.</p>
    <p>Front-end instrumentation typically uses JavaScript (web), Objective C (iOS), or Java (Android), while back-end instrumentation could involve any server-side programming language, such as PHP, Ruby, Java, Scala, or Python.</p>
    <h4>Front-end Instrumentation</h4>
    <p>You probably already have some code that manages shopping cart interactions and order confirmations. To add front end instrumentation, you need to load the <a href="https://github.com/reportgrid/client-libraries.git">JavaScript client library</a> (precog/js/src/precog.js) and use the library to track customer actions.</p>
    <p>The JavaScript client library can be loaded by including the following script in HTML pages:</p>
    <pre>
&lt;script src="http://api.reportgrid.com/js/precog.js?apiKey=yourAPI KeyHere&amp;analyticsService=https://beta.precog.com/&amp;basePath=/yourRootPath/"&gt;&lt;/script&gt;  
    </pre>
    <p>Make sure to replace &Ograve;yourAPIKeyHere&Oacute; with your actual API key and &Ograve;yourRootPath&Oacute; with your actual base path. For example, the script for the sample tutorial dashboard is:</p>
    <pre>
&lt;script src="http://api.reportgrid.com/js/precog.js?apiKey=ACA34385-B8F7-493A-835D-C8C310C45A16&amp;analyticsService=http://beta.precog.com/&amp;basePath=/0000000289/"&gt;&lt;/script&gt;    
    </pre>
    <p>Then the <strong>Precog.store()</strong> function can be used to track customer interactions. At a minimum, the function requires two arguments: a path indicating where to store the data, and the data to store:</p>
    <pre>
Precog.store("/path/to/store/data", dataToBeStored);  
    </pre>
    <p>There are also 3 optional arguments. The third argument allows some function to be run if the <strong>Precog.store()</strong> function succeeds. The fourth argument allows some function to be run if the <strong>Precog.store()</strong> function fails. The final optional argument allows you to specify options for the call, such as whether the call should block or return immediately. Details about this and all other client library functions can be found in the <a href="http://www.precog.com/client-libraries-javascript">developer center</a>.</p>
    <p>The example below illustrates how this function can be used with many of the options:</p><script src="https://gist.github.com/4196075.js" type="text/javascript">
    </script>
    <h4>Back-end Instrumentation</h4>
    <p>You probably also already have some code responsible for order processing. All that is needed is to add a few lines of code that will track order confirmation using the Precog API.</p><script src="https://gist.github.com/4196083.js" type="text/javascript">
    </script>
    <p>The first line loads the <a href="http://www.precog.com/client-libraries-php">PHP client library</a>. Lines 3-5 creates a new variable called <strong>$api</strong> that is an instance of the PrecogAPI. The arguments passed to the constructor are your API key and the Precog service URL. Lines 7-9 create an ISO8601 formatted timestamp. Lines 11-16 stores the event data in a variable, and the line 18 sends that data to Precog to be stored at the specified path.</p>
    <p>After this code is integrated into your platform, all future order confirmation events will be stored in Precog, and available for detailed analysis and reporting.</p>
    <h3>Step 5: Back Import Historical Data</h3>
    <p>You probably have some historical data that needs to be imported into Precog.</p>
    <p><a href="http://labcoat.precog.com">Labcoat</a> has an easy drag and drop interface for loading files in JSON, CSV, and zipped versions of those formats (Precog will be supporting more languages and formats in the future).</p>
    <p>However, you can also import your data programmatically using Precog API. You can use the REST API directly, or use one of the client libraries, such as PHP or JavaScript.</p>
    <p>For more details about the Precog REST API, please see the API reference in the <a href="http://www.precog.com/api-ingest">developer center</a>. The following two sections show how you to upload historical data using the PHP client library, both for data files you may have lying around, and for data stored in a SQL database.</p>
    <h4>PHP Client Library and JSON objects</h4>
    <p>First, you need to download the <a href="https://github.com/reportgrid/client-libraries/tree/master/precog">PHP client library</a>. Then you need to put that file (/precog/php/src/Precog.php), along with a properly formatted data file in the same directory. For this example, properly formatted means one JSON value per line:</p>
    <pre>
{"date": "1926-01-01","close": 12.76}
{"date": "1926-01-08","close": 12.78}
{"date": "1926-01-15","close": 12.52}
{"date": "1926-01-22","close": 12.45}  
    </pre>
    <p>For this example, the file is called <em>dataToUpload.json</em>.</p>
    <p>Put the following code in a file called <em>upload.php</em> in an appropriate directory:</p><script src="https://gist.github.com/4196092.js" type="text/javascript">
    </script>
    <p>Now with the data, the PHP client library, and the <em>upload.php</em> script all in the same directory, you can use the terminal to load data into Precog API.</p>
    <p>First, open the console in the appropriate directory. Then you can call the PHP file with the following command:</p>
    <pre>
&gt; php upload.php   
    </pre>
    <p>And that's all is needed to get your historical data into Precog!</p>
    <h4>PHP Client Library and SQL Database</h4>
    <p>SQL databases are another common source of historical data. At a high-level, the import process is quite similar: loop through the rows of a table, reading each row and storing it with the Precog API. (Note, we also have an open source SQL importer <a href="https://github.com/reportgrid/client-libraries/tree/JdbcImport/tools/import/jdbc">you can find here</a>.)</p>
    <p>The script below proceeds by loading the Precog PHP client library, creating an instance of the Precog API, and using that instance to store data. The SQL portion of the script opens a connection to the database, and uses the query function to extract the contents of the table. Notice the second, optional argument of the query function: <strong>PDO::FETCH_ASSOC</strong>. Without this argument, the query will return both the field name and the column number for each value. Including this option will return rows as an object with only the field names, making it easier to store the data in Precog.</p>
    <p>Assuming that you have a SQL database (or any PDO supported database) called <em>nimbleData.db</em>, and a table called Users, the following PHP script will import the data into Precog:</p><script src="https://gist.github.com/4196098.js" type="text/javascript">
    </script>
    <h3>Step 6: Use Labcoat to Analyze Data</h3>
    <p>You have now back imported historical data and instrumented your application so that all current data is flowing into Precog. Now you need to analyze the data in order to turn this raw data into actionable insights for your customers.</p>
    <p>Precog comes with industry-leading support for Quirrel, a simple, yet powerful language for analyzing data. You will do all data analysis using Quirrel.</p>
    <p>The easiest way to develop Quirrel is to use <a href="http://labcoat.precog.com/">Labcoat</a>, which is a powerful browser-based tool for developing and deploying Quirrel scripts. You can embed any queries you develop in Labcoat into your application and run them on-demand using the Precog API.</p>
    <p>This step includes a concrete set of <a href="http://quirrel-lang.org/">Quirrel</a> examples. Some resources to provide an initial orientation to Quirrel include the following:</p>
    <ul>
      <li><a href="http://www.youtube.com/watch?v=lEPnAFUyf3o">A basic syntax screencast</a>.</li>
      <li><a href="http://www.youtube.com/watch?v=PCnXZNQOIKI">A filtering screencast</a>.</li>
      <li><a href="http://www.youtube.com/watch?v=bR9ppqpnLHo">A screencast on built-in functions</a></li>
      <li><a href="httpL//www.youtube.com/watch?v=njuJ4P901-c">A screencast on solve statements</a></li>
      <li>The <a href="http://www.precog.com/quirrel-introduction">Quirrel Introduction</a> section of the Developer Center.</li>
    </ul>
    <p>You can also follow along with the preloaded sample data in the preview version of <a href="https://labcoat.precog.com">Labcoat</a> in the /tutorial/transactions path.</p>
    <p>Let&Otilde;s begin by considering a few questions Apocalypse Products might be interested in answering. We&Otilde;ll then develop Quirrel scripts to answer these questions.</p>
    <p>One thing they might be interested in is how much money is being generated by each product. To narrow the focus a bit, we might want to focus just on the top five products. So, our first query will rank all the products by sales and filter to return the top five results.</p>
    <p>They might also be interested how many products are being sold overall. Having a month-by-month breakdown might also be useful. The second query will sum the number of products sold per month. These results will be further filtered to include only year to date results.</p>
    <p>Finally, perhaps they want to know the proportion of sales that have been generated by a specific source (such as various ad campaigns, email blasts, or directly on the website). Furthermore, they want these totals during a specific hour of the day. This last query will determine the total sales generated by each source by hour of day and return the results for a specific hour (1:00 PM in this case).</p>
    <h4>Query 1: Top Five Products (By Total Sales)</h4>
    <p>Here&Otilde;s a query to list the top five products by total sales:</p><script src="https://gist.github.com/4196104.js" type="text/javascript">
    </script>
    <h4>Query 2: Year-to-Date Quantity of Product Sold by Month</h4>
    <p>The query below will return the total quantity of all products sold each month for this year up to today.</p><script src="https://gist.github.com/4196107.js" type="text/javascript">
    </script>
    <h4>Query 3: Proportion of Sales Generated by Source at 1 o&Otilde;clock</h4>
    <p>The last query we&Otilde;ll examine in this tutorial will return the total sales from each source during a specific hour of the day.</p><script src="https://gist.github.com/4196110.js" type="text/javascript">
    </script>
    <h3>Step 7: Create and Embed a Reporting Dashboard</h3>
    <p>Queries generate useful information, but sometimes raw numbers aren&Otilde;t the best way to convey this information. Apocalypse Products does not want to sift through a bunch of spreadsheets to know if they are meeting sales goals. They want you to provide them with a real-time dashboard that conveys this information at a glance. Access to snazzy e-commerce analytics and reporting is part of why Apocalypse Products chose to use your platform to sell goods.</p>
    <p>In just a few minutes, you can take the Quirrel code you developed in Labcoat, combine it with ReportGrid, and deploy a beautiful, self-service reporting dashboard for Apocalypse Products.</p>
    <h4>Integrate Javascript Client Library and ReportGrid Visualization Library</h4>
    <p>Developing the reporting dashboard will require you include in your web pages both the JavaScript client library, and the ReportGrid visualization library.</p>
    <p>All you need to do is to add some code in the header of the appropriate HTML documents.</p>
    <p>The first line is the stylesheet that provides appropriate formatting for the ReportGrid visualization library. The second provides access to the ReportGrid visualization library itself. The remaining lines provide access to the JavaScript client library, configured using the Apocalypse Products API key and base path settings.</p>
    <pre>
    &lt;link rel="stylesheet" type="text/CSS" href="http://api.reportgrid.com/CSS/rg-charts.CSS"&gt;
    &lt;script src="http://api.reportgrid.com/js/reportgrid-charts.js"&gt;&lt;/script&gt;
    &lt;script src="http://api.reportgrid.com/js/precog.js?apiKey=ACA34385-B8F7-493A-835D-C8C310C45A16&amp;analyticsService=http://beta.precog.com/&amp;basePath=/0000000289/"&gt;&lt;/script&gt;
    </pre>
    <p>Remember, this example uses a read-only API key for a sample tutorial account. When integrating the JavaScript client library into your application, make sure to replace the appropriate sections with your API keys, and make sure you never expose your master API key since that could compromise the data in your account.</p>
    <h4>Visualizing and Embedding Queries</h4>
    <p>Now you&Otilde;re not far from producing a working dashboard:</p><img src="images/dashboard.png" alt="" />
    <p>As seen in the screenshot above, we package up the first query into a leaderboard, the second into a line graph, and the third into a bar chart.</p>
    <p>We&Otilde;ll begin by introducing three functions from the ReportGrid visualization library:</p>
    <ul>
      <li><strong>ReportGrid.leaderBoard()</strong></li>
      <li><strong>ReportGrid.lineChart()</strong></li>
      <li><strong>ReportGrid.barChart()</strong></li>
    </ul>
    <p>First, use <a href="http://labcoat.precog.com/&quot;">Labcoat</a> to get the code for our queries and assign them into variables. Go to Labcoat, run the code for the top five products query and click on the download code button. If we need an HTML outline generated as well, we can select the HTML tab, otherwise, we can select the compact option under the Quirrel tab. In this case:</p>
    <pre>
data := //tutorial/transactions salesByProduct := solve 'product {product: 'product, sales: sum(data.total where data.ApocalypseProducts = 'product)} rank := std::stats::rank(neg salesByProduct.sales) salesByProduct where rank &lt;= 5
    </pre>
    <p>You can then assign this to a variable for ease of use and more readable code.</p>
    <pre>
var leaderBoardQuery= "data := //tutorial/transactions salesByProduct := solve 'product {product: 'product, sales: sum(data.total where data.ApocalypseProducts = 'product)} rank := std::stats::rank(neg salesByProduct.sales) salesByProduct where rank &lt;= 5"    
    </pre>
    <p>Note that the query is enclosed in double quotes, if other double quotes appear in the query they will need to be escaped using a backslash \ or you can enclose the query in single quotes. Then you can do the same thing for the next two queries.</p>
    <pre>
var lineChartQuery= "import std::time::* data := //tutorial/transactions today := 233 dataWithMonthAndYearAndDay := data with { month: monthOfYear(data.timeStamp), year: year(data.timeStamp), day: dayOfYear(data.timeStamp) } quantityByMonth := solve 'month monthData := dataWithMonthAndYearAndDay where dataWithMonthAndYearAndDay.month = 'month { month: 'month, quantity: sum(monthData.quantity), year: monthData.year, day: monthData.day } distinct({ quantity: quantityByMonth.quantity, month: quantityByMonth.month } where quantityByMonth.year = 2012 &amp; quantityByMonth.day &lt; today)"    
    </pre>
    <pre>
var barChartQuery= "data := //tutorial/transactions dataWithHour := data with {hour: std::time::hourOfDay(data.timeStamp)} aveSalesByHour :=solve 'source, 'hour data' := dataWithHour where dataWithHour.source = 'source &amp; dataWithHour.hour = 'hour {source : 'source, averageSales: sum(data'.total), hour : 'hour} aveSalesByHour where aveSalesByHour.hour = 13"    
    </pre>
    <p>Now you can use these variables in the three functions, each of which needs to have its axes declared (the first is the x-axis, the second is the y-axis) and what data to load.</p><script src="https://gist.github.com/4196123.js" type="text/javascript">
    </script>
    <p>You also need to add some div containers to hold these chart objects.</p>
    <pre>
&lt;div id="chart1" class="chartExample"&gt;&lt;/div&gt;
&lt;div id="chart2" class="chartExample"&gt;&lt;/div&gt;
&lt;div id="chart3" class="chartExample"&gt;&lt;/div&gt;
    </pre>
    <p>Notice that the first argument in the ReportGrid functions refers to a div Id (#chart 1 in the function, chart1 as the div Id). Also notice the load syntax, which takes as its argument the variables constructed above.</p>
    <p>To finish up, you can add a logo, navigation menu, a footer and some text boxes for sample descriptive text.</p>
    <p>Now we&Otilde;ll also take a look at the local CSS stylesheet used along with this file to create the demo dashboard. For local testing, the HTML file needs to be included in the same directory as the Precog Client Library file. That directory should contain a folder called CSS that will contain the sample.css file as well as an images folder with the appropriate images.</p>
    <p>Put the logo inside a div container that is nested in the header that is nested in the site holder.</p>
    <pre>
&lt;div id="logo"&gt;&lt;/div&gt;  
    </pre>
    <p>Make the navigation menu with an unordered list tag and list elements:</p>
    <pre>
&lt;div id="menu"&gt;
  &lt;ul&gt;
    &lt;li&gt;<a href="#">home</a>&lt;/li&gt;
    &lt;li&gt;<a href="#">products</a>&lt;/li&gt;
    &lt;li&gt;<a href="#">about zombies</a>&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;
    </pre>
    <p>Create some chart titles and sample descriptive text:</p>
    <pre>
&lt;div class = "chartDescription"&gt;
  &lt;h2&gt; Highest Grossing Apocalypse Products&lt;/h2&gt;
    &lt;p&gt;
  Fusce condimentum rhoncus est, id rhoncus felis semper vitae. Curabitur tellus nibh, accumsan eget porttitor vel, congue sed nunc. Cras ac dui sit amet nisl scelerisque bibendum. Pellentesque sem turpis, iaculis non molestie eu, commodo eu ante. Proin sit amet nisl lacus, quis pulvinar augue. Phasellus id dolor vel justo facilisis aliquet nec in eros.
    &lt;/p&gt;
&lt;/div&gt;
    </pre>
    <p>Finally, here are snippets from the <em>sample.css</em>that formats the above HTML.</p>
    <p>The CSS file is divided into four sections: one that applies to the entire page, and then sections for the header, body and footer. The code below sets the width and height of the charts as well as stacks them beside each other:</p>
    <pre>
.chartExample {
width: 30%;
height: 210px;
margin-right: 5%;
float:left;
}
    </pre>
    <p>The text boxes are formatted in a similar way. A wide variety of options are available through CSS styling: anything font-related, positioning, color schemes, etc.</p>
    <p>To see a functional version of this dashboard (if you haven&Otilde;t been following along and creating it yourself), <a href="http://www.precog.com/external/Tutorials/apocalypsetutorial/ApocalypseProductsDashboard.htm">follow this link</a>. As an exercise, consider trying to modify the bar chart into a pie chart (hint: just use ReportGrid.pieChart in place of ReportGrid.barChart).</p>
    <p>This concludes the tutorial on how to Embed Reporting in Your App for Your Customers.</p>
    <p>Please give us some feedback and let us know how you are able to integrate these ideas into your applications. Please also let us know what other applications of the Precog platform you&Otilde;d like to see us cover in the How-To series.</p>
</div>