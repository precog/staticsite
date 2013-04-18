title: Introducing Labcoat by Precog
author: Tasha Kelly
date: 2012-08-6 00:00
template: post.jade

<p>Today marks the official launch of <a href="labcoat">Labcoat</a>, a new interactive environment for data analysis that makes some of the incredible technology we've been working on accessible to anyone with a browser and a passion for understanding data.</p>
<p>Until this moment, Precog has only offered an API, with no tools of any kind (which has made it remarkably hard to demo Precog!). Developers in our private beta have used our ingest API to capture behavioral, transactional, and historical data, and then used our analysis API to analyze the data, usually to power features like analytics and reporting inside their applications.</p>
<p>As we helped our private beta customers integrate Precog into their own applications, however, we keenly felt the lack of solid development tools.</p>
<p>In the early phases of integration with Precog, you don't really know how you want to analyze the data to power different features in your application. It's a trial and error process, and until recently, it was dominated by frequent use of the Javascript client library or the curl command-line utility &#8212; the two "easiest" ways to interface with our API.</p>
<p>Our API is great for building automated functionality inside applications (features like analytics, insights, reporting, predictions, and so forth). But in its raw form, the API is a poor fit for the iterative, experimental nature of learning how best to analyze data to build those features.</p>
<p>We realized something needed to be done about the problem, so we went to the drawing board and started brainstorming about how we could make exploratory data analysis as accessible as possible.</p>
<p>We emerged with an ambitious set of goals. We wanted to make all of the following incredibly easy for users:</p>
<ul>
<li>Getting data into Precog in a variety of data formats.</li>
<li>Developing queries in Quirrel (the powerful query language we support on the backend).</li>
<li>Running queries and getting the results directly and in chart format.</li>
<li>Collaborating with team members and the broader Quirrel community.</li>
</ul>
<p>Months later, after countless hours spent developing, testing, and refining based on early feedback, we are proud to announce Labcoat &#8212; the tool so incredible easy and addictive to use, we're betting it will unleash the inner data scientist in anyone who tries it.</p>
<p><iframe width="625" height="390" src="http://www.youtube.com/embed/vKPmZKLt3G0" frameborder="0" allowfullscreen></iframe></p>
<p>Labcoat was designed to be a developer tool, so it has lots of nice features designed to make it easy to build data-driven applications on Precog. For example, once you develop a query that produces the results you want, you can easily export it as code (PHP, Javascript, Ruby, Java, etc.), embed the code into your application, and run the query programmatically to power features inside your application.</p>
<p>Beyond just developers, though, Labcoat makes some pretty incredible data analysis technology accessible to non-developers. Precog has excellent support for Quirrel, a very simple yet powerful query language designed for data analysis. Quirrel can be used by just about anyone, even if they don't have an analytical background (our Director of Marketing learned the basics in 2 hours!).</p>
<p>Data analysts, data scientists, statisticians, and others who do have an analytical background will feel right at home in Labcoat &#8212; poking, prodding, massaging, and analyzing data to uncover all sorts of incredibly interesting insights. And, whatever the data guys come up with can be seamlessly productized by engineering teams with a few clicks of the mouse button.</p>
<p>In this way, Labcoat succeeds at bringing together two worlds that have remained separate: the world of the data scientist, who interactively and iteratively explores data; and the world of the software engineer, who productizes data by using it to power features inside applications.</p>
<p>Sound intriguing? Then hop on over to <a href="http://labcoat.precog.com">http://labcoat.precog.com to experience Labcoat for yourself. There's nothing to install, nothing to configure, and you don't need to signup for an account. Just jump right in and explore some of the sample data sets we've preloaded into this special preview version of Labcoat. Let us know what you find and how we can make the tool even better!</p>