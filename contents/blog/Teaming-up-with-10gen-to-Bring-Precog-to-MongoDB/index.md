title: Teaming up with 10gen to Bring Precog to MongoDB
author: John De Goes
date: 2012-11-07 00:00
template: post.jade

<p>Today, we're excited to announce the launch of <a href="mongodb">Precog for MongoDB</a>, a release that bundles all of the really cool Precog technology into a free package that anyone can download and deploy on their existing MongoDB database.</p>
<p>We've known for a long time that we were going to bring a standalone version of our data science platform to some NoSQL database. Here are the reasons why we chose MongoDB:</p>
<ul>
<li>MongoDB developers share our passion for creating software that developers love to use.</li>
<li>Quirrel is designed to analyze JSON, which is natively supported by MongoDB.</li>
<li>MongoDB has a basic query and aggregation framework, but to do more advanced analytics, you have to write lots of custom code or export the data into a RDBMS, both of which are very painful.</li>
<li>We're great friends of some of the 10gen developers and have released <a href="https://github.com/jdegoes/blueeyes/tree/master/mongo">open source software for MongoDB</a>.</li>
</ul>
<p><a href="mongodb">Precog for MongoDB</a> gives you the ability to analyze all the data in your MongoDB database, without forcing you to export data into another tool or write any custom code.</p>
<p>We're really excited about the release and encourage you to <a href="mongodb">download the release</a> (zipped file) and start using it today. You can start to analyze your data in a matter of minutes! Simply <a href="mongodb">visit our page</a>, complete the brief form, and confirm your email address to then download the file. We want to help you get started, so here are the steps for installation and configuration:</p>
<p><strong>Step 1: Unpack the Download </strong></p>
<p>The download is a ZIP file that contains the following files: </p>
<pre>precog.jar
config.cfg
precog.sh
precog.bat</pre>
<p>The file <strong>precog.jar</strong> is the Java JAR that bundles all of the Precog dependencies into a single (really big!) file. The files <strong>precog.sh</strong> and <strong>precog.bat</strong> are scripts that launch <strong>precog.jar</strong>.</p>
<p>The file <strong>config.cfg</strong> contains configuration information.</p>
<p><strong>Step 2: Configure Precog </strong></p>
<p>All the configuration settings for Precog are stored in the file <strong>config.cfg</strong>, with reasonable defaults.</p>
<p>There are two things you need to do at a minimum before you can launch Precog:</p>
<ul>
<li>Tell Precog where to find the MongoDB server.</li>
<li>Tell Precog what the master account is.</li>
</ul>
<p>To tell Precog where to find the MongoDB server, simply edit the mongo server key in the settings:</p>
<pre>
queryExecutor {
 mongo {
   server = "mongodb://localhost:27017"
 }
}
</pre>
<p>Change the "localhost:27017" portion to the host and port of your mongo server. For optimal performance, you should launch Precog on the same machine that is running the MongoDB server.</p>
<p>Precog will map the MongoDB databases and collections into the file system by placing the databases at the top level of the file system, and will nest the database collections under the databases (e.g. <em>/mydb/mycollection/</em>).</p>
<p>To tell Precog what the master account is, edit <strong>config.cfg</strong> and edit the following settings under the masterAccount section:</p>
<pre>
security {
 masterAccount {
   apiKey = "12345678-1234-1234-1234-123456789abc"
 }
}
</pre>
<p>The API key for the master account can be anything you like, but you should treat it securely because whoever has it has full access to all of your MongoDB data.</p>
<p>You may also want to tweak the ports that Precog uses for the web server that exposes the Precog REST API and to serve labcoat:</p>
<pre>
    server {
 port = 8888
   }
   É
   labcoat {
     port = 8000
   }
</pre>
<p><strong>Step 3: Launch Precog </strong></p>
<p>To run <strong>precog.jar</strong>, you will need to install JRE 6 or later (many systems already have Java installed). If you're on an OS X or Linux machine, just run the <strong>precog.sh</strong> script, which automatically launches Java:</p>
<p><strong>precog.sh</span></strong></p>
<p>If you're on a Windows machine, you can launch Precog with the <strong>precog.bat</strong> script.</p>
<p>Once Precog has been launched, it will start a web server that exposes the REST API as well as labcoat.</p>
<p><strong>Step 4: Try the API </strong></p>
<p>Once Precog is running, you have full access to the <a href="developers">Precog REST API</a>. You can find a large number of open source client libraries <a href="https://github.com/reportgrid/client-libraries">available on Github</a>, and the Precog developers site contains a bunch of <a href="developers">documentation and tutorials</a> for interacting with the API.</p>
<p><strong>Step 5: Try Labcoat </strong></p>
<p>Labcoat is an HTML5 application that comes bundled in the download. You don't have to use Labcoat, of course, since Precog has a REST API, but Labcoat is the best way to interactively explore your data and develop Quirrel queries.</p>
<p>The precog.jar comes with a bundled web server for labcoat, so once it's running just point your browser at <a href="http://localhost:8000/">http://localhost:8000/</a> (or whatever port you've configured it for) and you'll have a new labcoat IDE pointing at your local Precog REST API.</p>
<p><strong>Step 6: Analyze Data! </strong></p>
<p>Once you've got Labcoat running, you're all set! You should see your MongoDB collections in the file system explorer, and you can query data from the collections, develop queries to analyze the data, and export queries as code that run against your Precog server. Precog is a beta product, and <em>Precog for MongoDB</em> is hot off the press. You may encounter a few rough corners, and if so, we'd love to hear about them (just send an email to <a href="mailto:support@precog.com">support@precog.com</a>). Have fun analyzing!</p>