title: Precog Zombie Says- "Learn more Quirrel. It makes your brain better."
author: Nathan Lubchenco
date: 2012-10-31 00:00
template: post.jade

<p><a href="http://blog.precog.com/?attachment_id=68" rel="attachment wp-att-68"><img class="alignnone size-full wp-image-68" alt="png;base64aa915f8f37220d91" src="http://blog.precog.com/wp-content/uploads/2012/12/pngbase64aa915f8f37220d91.png" width="555" height="173" /></a></p>
<p>To make the Precog Zombie happy, you can watch previous tutorials covering basic syntax and filtering which are available in the mausoleum of learning.</p>
<p>Here are two additional tutorial videos explaining some of the most useful functionality of Quirrel: built-in functions and solve statements.</p>
<p>This video provides a brief overview of a handful of functions but a complete list of built-in functions is available. Two highlights are how to import a module of functions and an example showing how to utilize rank. *No zombies were harmed during the making of this video.</p>
<p><iframe src="http://www.youtube.com/embed/bR9ppqpnLHo" height="315" width="560" allowfullscreen="" frameborder="0"></iframe></p>
<p>Solve statements are one of the most important features of Quirrel. In conjunction with Quirrel’s set-based nature, solve statements banish the spectre of traditional control structures such as for statements and while loops. It is possible to evaluate a statement at all possible values of a parameter in Quirrel by using a solve statement. All possible values of a parameter in a solve statement are determined by the constraints.</p>
<p>For example, in the solve statement below, &#8216;zombies is constrained to values of data.zombies. So, for each zombie you will get an object that contains two fields: monsterId and infections. The monsterId field will be populated with values from data.zombies and the infections field will be the results of the count on data.infections for each zombie.</p>
<pre>solve 'zombies
  { monsterId: 'zombies,
  infections: count(data.infections where data.zombies =   
       'zombies)
}</pre>
<p><iframe src="http://www.youtube.com/embed/njuJ4P901-c" height="390" width="625" allowfullscreen="" frameborder="0"></iframe><br />
Another good way to learn more Quirrel is to run and modify some of the sample queries in the demo version of Labcoat. Check out a query that returns the top five products sold by ApocalypseProducts. Zombie insurance anyone?</p>