title: Visualize Our Events on a Geo Chart
author: Tasha Danko
date: 2012-08-23 00:00
template: post.jade

<p>Over the next few months, our team will be traveling to events and conferences around the country. Check out the complete events list on our <a href="news-and-events/21-precog-event">website</a>.</p>
<p>We’re fanatic about making data easier to understand and turning it into information. Because of this, we take any opportunity to create a good chart with our data. So, we created a visual representation of these events using a <strong>Geo Chart</strong> from the <a href="http://www.reportgrid.com/">ReportGrid visualization library</a>.</p>
<p>The code to make the Geo Chart is available in a gist. <a href="https://gist.github.com/3428991">Check it out</a>.</p>
<p>This chart is different than most, in that the data is in <a href="http://www.geojson.org/">geoJSON format</a>. This format is for encoding a variety of geographic data structures. The Geo Chart visualization works by projecting layers of <em>geoJSON</em> objects.  It comes equipped with some templates, including the states in the US and a world countries map.</p>
<p>This example projects the <em>usa-states </em>template and then layers additional content on top. The layers consist of cities, lines and labels. The geoJSON data needs to be placed in a JavaScript wrapper (easily viewable in the gist).  Some css styling is done in the file as well for convenient access and to make it easier to play with the graphical settings if you want.  Have fun making your own Geo Chart!</p>
<p>&nbsp;</p>