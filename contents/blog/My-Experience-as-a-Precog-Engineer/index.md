title: My Experience as a Precog Engineer
author: Brian McKenna
date: 2012-11-16 00:00
template: post.jade

<p>I&#8217;ve been working at Precog for three months, today. I was first contacted by our <a href="blog-precog-2/entry/do-you-have-what-it-takes-to-be-a-precog-engineer">overenthusiastic CEO</a> because of my work on <a href="http://roy.brianmckenna.org/">Roy</a> and other projects:</p>
<p><em>"You have a background in functional programming, Scala, and programming language design and implementation, which is a great fit for our entire front-end. You are also an active open source contributor, like many of the engineers on our team." </em></p>
<p>What's it like to work with the <a href="https://github.com/jdegoes/blueeyes">creator of BlueEyes</a>, a <a href="https://github.com/nuttycom/scalaz">contributor to Scalaz</a> and the <a href="https://twitter.com/djspiewak">creator of ActiveObjects</a>? Awesome.</p>
<p><strong>Challenge </strong></p>
<p>There isn&#8217;t a huge supply of language geeks so my Precog Challenge was specially crafted. My program was to take an AST for a query language that could do counts, sums, averages, and standard deviations. The AST would have to be split and distributed to a cluster.</p>
<p>I tried implementing it a few days later &#8211; it was way too easy. Each operation could be implemented using a simple monoid.</p>
<p>Turns out John simplified the problem too much. He added a couple more operations to make it harder (median and mode).</p>
<p>I went away and read some papers on query distribution on a couple of nights then eventually came back to complete the problem in 456 lines. I spent less than 10 hours on coding the final project, a chunk of it spent on getting SBT and Specs2 to work properly (<a href="https://twitter.com/PLT_Hulk/status/268520848451833857">PLT_Hulk</a> was right). That&#8217;s over one minute per line of code.</p>
<p>I&#8217;ve published my solution on <a href="https://bitbucket.org/puffnfresh/querylang">Bitbucket</a>.</p>
<p><strong>Boulder </strong></p>
<p>I moved to Boulder from Sydney, Australia. Australians are lucky if they want to work in the U.S. &#8211; it only took a couple of weeks to get authorised to work here. I worked from Brisbane for a month while I got rid of all my things.</p>
<p>Finding a place took about two weeks of looking on Craigslist. Here is my view in the morning:</p>
<p><a href="http://blog.precog.com/?attachment_id=75" rel="attachment wp-att-75"><img class="alignnone size-full wp-image-75" alt="b2ap3_thumbnail_2012-10-07-11.00.13" src="http://blog.precog.com/wp-content/uploads/2012/12/b2ap3_thumbnail_2012-10-07-11.00.13.jpeg" width="300" height="400" /></a></p>
<p><a href="http://blog.precog.com/?attachment_id=76" rel="attachment wp-att-76"><img class="alignnone size-full wp-image-76" alt="b2ap3_thumbnail_2012-11-08-00.35.56" src="http://blog.precog.com/wp-content/uploads/2012/12/b2ap3_thumbnail_2012-11-08-00.35.56.jpeg" width="400" height="267" /></a></p>
<p>After about a month of being here, Daniel Spiewak rented a car and took me to <a href="http://www.nps.gov/romo/index.htm">Rocky Mountain National Park</a>. It was crazy to go from rock to snow in 10 minutes.</p>
<p><a href="http://blog.precog.com/?attachment_id=77" rel="attachment wp-att-77"><img class="alignnone size-full wp-image-77" alt="b2ap3_thumbnail_2012-10-14-09.45.15" src="http://blog.precog.com/wp-content/uploads/2012/12/b2ap3_thumbnail_2012-10-14-09.45.15.jpeg" width="400" height="300" /></a></p>
<p><a href="http://blog.precog.com/?attachment_id=78" rel="attachment wp-att-78"><img class="alignnone size-full wp-image-78" alt="b2ap3_thumbnail_2012-10-15-02.44.35" src="http://blog.precog.com/wp-content/uploads/2012/12/b2ap3_thumbnail_2012-10-15-02.44.35.jpeg" width="400" height="267" /></a></p>
<p>That is something you don&#8217;t see in Australia.</p>
<p><strong>Work </strong></p>
<p>I&#8217;ve found the work here to be <em>extremely</em> challenging. The Precog Platform didn&#8217;t seem like a lot at first but it&#8217;s pretty intimidating upon closer inspection:</p>
<ul>
<li>Set-oriented statistical language (Quirrel)
<ul>
<li>Generalized parser (GLL)</li>
<li>3 proposed type systems</li>
<li>Compiler to custom bytecode</li>
</ul>
</li>
<li>Bytecode evaluator</li>
<li>DAG rewriting</li>
<li>Table querying and manipulation
<ul>
<li>Highly efficient</li>
<li>Distributed</li>
</ul>
</li>
<li>Data storage</li>
<li>Security</li>
<li>JSON importing
<ul>
<li>Fault tolerant</li>
<li>Different datastore backends</li>
</ul>
</li>
<li>API
<ul>
<li>Web server (BlueEyes)</li>
<li>JSON parsing (BlueEyes)</li>
</ul>
</li>
</ul>
<p>Because this is big data, all of the above needs to be as <em>insanely</em> fast. It&#8217;s definitely not the easiest thing I&#8217;ve worked on.</p>
<p>Luckily, I have mathematicians and performance gurus to work with. Being able to pair with engineers that have skills I&#8217;ll never be able to attain is the best part of the job. I&#8217;m having fun and being amazed by what people do here. That is why I&#8217;m at Precog.</p>