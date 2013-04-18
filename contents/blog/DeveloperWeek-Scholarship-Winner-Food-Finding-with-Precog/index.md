title: DeveloperWeek Scholarship Winner- Food Finding with Precog
author: Tasha Kelly
date: 2013-02-21 18:07
template: post.jade

<p>Precog recently sponsored a <a href="http://www.developerweek.com/index/scholarships">DeveloperWeek Scholarship</a> to give an opportunity to a developer to work on an app during the week and present at the conference. After reviewing the applications we chose <strong>Henry Canivel</strong>, an eager-to-learn and friendly developer from the Bay Area. His winning app is called “Foodvent” and please continue reading to learn how he built the webapp with our technology. Congratulations to Henry for winning the scholarship!</p>
<p><a href="http://foodvent.herokuapp.com/"><img class="alignnone size-large wp-image-416" alt="Screen Shot 2013-02-21 at 2.52.05 PM" src="/blog/images/Screen-Shot-2013-02-21-at-2.52.05-PM-1024x719.png" width="625" height="438" /></a></p>
<p><em style="line-height: 1.714285714; font-size: 1rem;">Hi! My name is Henry Canivel. I build this webapp, Foodvent, targeting event organizers to help plan their events by creating a dynamic dashboard to find the best restaurants in the area to cater to their event. As the Precog scholarship winner for the inaugural Developer Week, organized by Data 2.0, I recognized the opportunity to use <a href="http://www.precog.com/products/precog">Precog&#8217;s pretty awesome analytics platform</a>! How cool would it be to use their analytics to help fuel a recommendation engine!?</em></p>
<p><em>This was my first real JS project utilizing public APIs; the last thing I really want to do is figure out my own analytics engine to do some pretty heavy but potent data crunching. Using Precog&#8217;s <a href="http://www.precog.com/products/labcoat">Labcoat</a>, I was able to upload some open source database of basic info of restaurants around San Francisco including name, address, geographic coordinates and a few other basic fields. Precog&#8217;s Labcoat service is pretty clean and simple to use as there&#8217;s multiple useful interfaces within the dashboard, including the <a href="http://quirrel-lang.org/reference.html">Quirrel reference guide</a>, an IRC port window, and ridiculously useful features to download your queries in various languages like python, javascript, and even Java! No need to install any client side libraries, just import their standard public JS with your credentials, and BOOM! make Precog API calls instantly!</em></p>
<p><em>The focus of my app is to dynamically browse for events and restaurants based on a movable marker on a map. Where Precog&#8217;s analytical services particularly kick ass is where I can just feed it new coordinates and voila! Fresh and new query results based on my dynamic input!! </em></p>
<p><em>You should check it out over here: <a href="http://foodvent.herokuapp.com/">Foodvent</a></em></p>
<p><em>Move the map marker or circle radius to kick off my call to Precog&#8217;s analytics service to tell you how many restaurants are within radius! Even coding this, I think it&#8217;s pretty addictive playing with the map and seeing what Precog will find. Don&#8217;t you think?</em></p>
<p>Like Henry mentions above, he used the <a style="line-height: 1.714285714; font-size: 1rem;" href="http://www.precog.com/products/precog">Precog Analytics Platform</a> to determine the number of restaurants in a dynamically resizable radius. Below is an example query developed in Precog’s <a style="line-height: 1.714285714; font-size: 1rem;" href="https://labcoat.precog.com/">Labcoat</a> that makes use of some Quirrel standard math library functions:</p>
<pre>import std::math::*

all := //first_upload/foodvent
radius := 1110.9770658801172
R := 6371000

lat_me := 37.787123
lon_me := neg 122.40113100000002

dlat := toRadians(all.latitude) - toRadians(lat_me)
dlon := toRadians(all.longitude) - toRadians(lon_me)
lat1 := toRadians(all.latitude)
lat2 := toRadians(all.longitude)

a := 	sin(dlat/2) * sin(dlat/2) + 
sin(dlon/2) * sin(dlon/2) *
cos(lat1) * cos(lat2)
c := 2 * atan2(sqrt(a), sqrt(1-a))

d := (R * c)
d' := d where d &lt;= radius

count(d')</pre>
<p>Congratulations to Henry for winning the DeveloperWeek scholarship and thank you for building <a href="http://foodvent.herokuapp.com/">a web app</a> on Precog technology!</p>