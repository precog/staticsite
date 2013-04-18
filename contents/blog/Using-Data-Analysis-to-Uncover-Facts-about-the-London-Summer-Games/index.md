title: Using Data Analysis to Uncover Facts about the London Summer Games
author: Tasha Kelly
date: 2012-08-8 00:00
template: post.jade

<p>I'm pleased to introduce myself as new the <strong>Developer Evangelist</strong> for <strong>Precog!</strong> I am responsible for tutorials, documentation and providing support for our user community. Have a specific tutorial request? <a href="mailto:nathan@precog.com">Let me know</a> and I'll try to provide resources for popular topics.</p>
<p>During the Opening Ceremony of the Olympic Games, some friends and I made a few friendly wagers to make things more exciting. Two of the nail biters were:</p>
<ul>
<li>Will there be a country with only 1 athlete participating?</li>
<li>Will there be over or under 550 athletes from the US this year?</li>
</ul>
<p>Every time a small island nation showed up during the march of nations, we'd be on the edge of our seats to see how many athletes were walking into the stadium. The line for the US was really quite close (none of us cheated beforehand) and Vanuatu following shortly thereafter as a last chance for a solo athlete. So both of these wagers were determined in the last couple of minutes.</p>
<p>Rather than just tell you the answers now (that would be too easy!), I'm going to introduce a new tool from Precog that will help you answer these and many more questions.</p>
<p>As you may have read <a href="blog-precog/entry/introducing-labcoat-by-precog">earlier in the week</a>, we just launched <a href="labcoat">Labcoat</a>, a great interactive development tool for analyzing data. One of the sample data sets pre-loaded in Labcoat is a list of athletes competing in the Olympic Games in London. The data includes the name, sport, country and population of country for each athlete.</p>
<p><a href="http://blog.precog.com/?attachment_id=14" rel="attachment wp-att-14"><img class="alignnone size-full wp-image-14" alt="summer-games" src="http://blog.precog.com/wp-content/uploads/2012/12/summer-games.png" width="1194" height="701" /></a></p>
<p>Here are some quick tips to get you started analyzing the data for yourself:</p>
<ul>
<li>Check out a variety of sample datasets using the <strong>Virtual File System</strong>. Select a folder and click on the lightning bolt icon to query all of the data in that path. The <em>summer_games</em> folder contains not just an athletes folder with the list of athletes competing in 2012, but also another folder with historical medals to explore as well.</li>
<li>Run some sample queries in the <strong>Query Manager</strong>. These will give you a good idea about some of the functionality in the Quirrel language. Try modifying a few examples as a way to understand filtering and other concepts.</li>
</ul>
<p>Let's modify one of the the preloaded queries to help answer one of the questions:</p>
<ul>
<li>Find the <em>Athletes By Country</em> query in the <em>summer_games</em> folder. Double click to load the query and hit the "run" button.</li>
</ul>
<p><a href="http://blog.precog.com/?attachment_id=15" rel="attachment wp-att-15"><img class="alignnone size-full wp-image-15" alt="athletes_by_country_20120808-161332_1" src="http://blog.precog.com/wp-content/uploads/2012/12/athletes_by_country_20120808-161332_1.png" width="450" height="39" /></a></p>
<p>This query returns the number of athletes from each country. This is a good start to answer the first question: Will there be a country with only 1 athlete participating?</p>
<p>Now we just need to find the minimum number of athletes. So, we'll use the same core query with just a few modifications.</p>
<p>First, we'll assign the <strong>forall</strong> statement into a variable so it can easily be re-used in filtering. Then, we can call the <strong>min</strong> function on this new variable and get the answer we are looking for. The modifications are below:</p>
<pre><em>data := //summer_games/athletes
athletesByCountry := forall 'Countryname
   {CountryName: 'Countryname,
    count                 : count(data where data.Countryname = 'Countryname)} 
min(athletesByCountry)</em></pre>
<p>This query returns a result of 2, meaning the minimum number of athletes competing for any country was 2. So, there were no countries with only 1 athlete participating! I had many close calls, since there were numerous countries with 2 athletes, but in the end I managed to hang on and win this bet.</p>
<p>To answer the second question about the number of athletes from the US this year, we can simply replace the last line (calling <strong>min</strong> on <strong>athletesByCountry</strong>) with a <strong>where</strong> filter that returns only the data where the name of the country is "US".</p>
<pre><em>athletesByCountry where athletesByCountry.CountryName = "US"</em></pre>
<p>Modifying the query in this way will return two sets, each with just one value: <strong>CountryName</strong>: "US" and <strong>count</strong>: 534. I bet that there would be over 550 athletes from the US, so I just barely missed winning both bets. But fun was had by all.</p>
<p><a href="http://labcoat.precog.com">Visit Labcoat</a> to run these and many more queries. For a <a href="http://www.youtube.com/watch?v=cLHU8JZztNs">five-minute overview</a> of Labcoat, watch the video below:</p>
<p><iframe src="http://www.youtube.com/embed/cLHU8JZztNs" height="390" width="625" allowfullscreen="" frameborder="0"></iframe></p>
<p>Keep in mind that the tutorial and reference guide is conveniently located on the righthand side of <a href="http://labcoat.precog.com">Labcoat</a> to help with modifying any preloaded queries or building any queries from scratch. If you get an error on a query that leaves you scratching your head, go ahead and fire an email off to support using the envelope icon in the upper-right-hand side of the Quirrel editor pane. We'll help you <a href="labcoat">unleash your inner data scientist</a> in no time!</p>