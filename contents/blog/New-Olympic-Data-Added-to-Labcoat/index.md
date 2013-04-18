title: New Olympic Data Added to Labcoat
author: Tasha Kelly
date: 2012-08-17 00:00
template: post.jade

<p>The Summer Games in London have wrapped up and we've updated our data analysis tool, <a href="Labcoat">Labcoat</a>, with some additional data. This new data is a list of all the medal winners with some additional information such as height, weight and age: perfect for a few more example queries!</p>
<p>Let's start to explore this new data by checking out the new preloaded queries from the query manager (lower left-hand-side of Labcoat). There are four new sample queries in the summer games medals folder to take a look at: Attributes by Sport, Correlation of Letters In Name and Medals, Medals by Country and Percentage of Female Athletes by Country.</p>
<p>A lot of interesting analysis could be conducted on this data; I'd like to share just a few tidbits in this blog post. With the additional information about height, weight and age, it might be interesting to see how these vary across sports:</p>
<pre style="font-size: 11px;">data := //summer_games/londonMedals
bySport := forall 'Sport
  {sport: 'Sport,
aveAge:mean(data.Age where data.Sport ='Sport),
aveWeight: mean(data.Weight where data.Sport = 'Sport),
aveHeight:mean(data.HeightIncm where data.Sport ='Sport)}
bySport</pre>
<p>One way to easily analyze data in Labcoat is to click on a column label in the table format of results. This allows you to sort in ascending and descending order without having to rewrite the query. Click once to sort in ascending order and click a second time to sort in descending order. A brief investigation reveals that not only are medalists in Diving the youngest on average, but also the lightest and shortest.</p>
<p>In contrast, Equestrian medal winners are by far the oldest, being 6 years older on average than the second oldest group. The second contenders for oldest average age was beach volleyball (surprising to me). However, when considering the <a href="http://espn.go.com/olympics/summer/2012/volleyball/story/_/id/8248574/2012-summer-olympics-misty-treanor-kerri-walsh-jennings-win-beach-volleyball-gold">unprecedented 3rd consecutive gold</a> medal by <a href="http://en.wikipedia.org/wiki/Kerri_Walsh_Jennings">Kerri Walsh Jennings </a>and <a href="http://en.wikipedia.org/wiki/Misty_May-Treanor">Misty May-Treanor</a>, who are 34 and 35 respectively, this should have been less surprising.</p>
<p>In the next example, we can dig a bit deeper by using the built-in correlation function. Let's look at the relationship between the average letters in an athlete's name by country and the total number of medals won by that country.</p>
<p>Clearly the letters in someone's name will not cause them to be better or worse at an Olympic event, but cultural naming conventions may vary in such a way that letters in a name are associated with being from particular regions. And being from certain regions may have a causal impact on an athlete's ability to win a medal.</p>
<pre style="font-size: 11px;">data := //summer_games/londonMedals
byCountry := forall 'Country
 {country: 'Country,
gold: sum(data.G where data.Country = 'Country),
silver: sum(data.S where data.Country = 'Country), 
bronze: sum(data.B where data.Country = 'Country),
total: sum(data.Total where data.Country = 'Country),
aveLettersInName: mean(std::string::length(
data.Name where data.Country = 'Country))}
 std::stats::corr(byCountry.aveLettersInName, byCountry.total)</pre>
<p>Interestingly, the correlation of ~ -.23 means that there is an inverse correlation between letters in a name and medals won. Gold, silver and bronze medals were included in the above query for easy modification. Changing byCountry.total to byCountry.gold reveals that this inverse correlation is even stronger when considering just gold medals.</p>
<p>The final query we'll review is one that returns the top ten countries by percentage of female medal winners. The results are filtered by countries that won five or more medals to prevent a small handful of outliers from dominating the results (although this setting is easily changed for the curious).</p>
<pre style="font-size: 11px;">data := //summer_games/londonMedals
byCountry := forall 'Country
  {country: 'Country,
percentWomen: sum(data.Total where data.Sex = "F" &amp;
data.Country ='Country)/sum(data.Total where data.Country='Country),
total: sum(data.Total where data.Country = 'Country)}
filtered := byCountry where byCountry.total &lt;=5
filtered where std::stats::rank(neg filtered.percentWomen) &lt;= 10</pre>
<p>An interesting modification to this query is to replace the final line with a dynamic filter. Instead of examining the top ten results, we can return all the countries where the percent of female medal winners is higher than the average.</p>
<pre style="font-size: 11px;">filtered where filtered.percentWomen &gt; mean(filtered.percentWomen)</pre>
<p>Even though the United States did not make the top ten in this category, it is still an impressive showing for the US women &#8212; taking home nearly 57% of the medals the US won this year.</p>
<p>If you'd like to share any interesting insights you found or have a freely available data set you'd like to see us feature, please add a comment to blog post. We'd love to hear from you!</p>
<p>(This data from the Summer Games in London was provided by <a href="http://www.google.com/url?q=http%3A%2F%2Fwww.guardian.co.uk%2Fsport%2Fdatablog%2F2012%2Fjul%2F30%2Folympics-2012-alternative-medal-table&amp;sa=D&amp;sntz=1&amp;usg=AFQjCNFz84wafYyLwsH_9xPT99RiR12r6Q">The Guardian DataBlog</a>)</p>