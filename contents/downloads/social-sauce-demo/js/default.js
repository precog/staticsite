$(function(){

	/*BODY NAV ACTIVE CLASS*/
	$("#body-menu ul li a").click(function(){
		$("#body-menu ul li a").removeClass("active");
		$(this).addClass("active");
	});
	
	/*BODY PANEL SIZE*/
	function sidePanelResize(){
		var windowWidth = ((window.innerWidth - 1000)/2);
		
		$("#body-slide-left").css({
			'width': windowWidth + "px",
			'left': "-" + (windowWidth) + "px"
		});
		
		$("#body-slide-right").css({
			'width': windowWidth + "px",
			'right': "-" + (windowWidth) + "px"
		});
	}
	
	sidePanelResize();
	$(window).resize(sidePanelResize);
	
	$("#body-slide-left").click(function(){
		ReportGrid.tooltip && ReportGrid.tooltip.hide();
		var currentLocation = parseInt($("#holder-slider").css("left"));
		$("#body-menu ul li a").removeClass("active");
		
		if (currentLocation == 0) {
			$("#body-menu ul li:nth-child(1) a").addClass("active");
			
		} else if (currentLocation == -1000) {
			$("#body-menu ul li:nth-child(1) a").addClass("active");
			$("#body-slide-left").removeClass("left-arrow-activated");
		} else if(currentLocation == -2000) {
			$("#body-menu ul li:nth-child(2) a").addClass("active");
			$("#body-slide-right").addClass("right-arrow-activated");
		}
		
		if (currentLocation < -999) {
			$("#holder-slider").animate({
			'left': "+=1000"
			}, {queue: false}
			);
		}
	});
	
	$("#body-slide-right").click(function(){
		ReportGrid.tooltip && ReportGrid.tooltip.hide();
		var currentLocation = parseInt($("#holder-slider").css("left"));
		$("#body-menu ul li a").removeClass("active");
		
		if (currentLocation == -2000) {
			$("#body-menu ul li:nth-child(3) a").addClass("active");
		} else if (currentLocation == -1000) {
			$("#body-menu ul li:nth-child(3) a").addClass("active");
			$("#body-slide-right").removeClass("right-arrow-activated");
		} else if(currentLocation == 0) {
			$("#body-menu ul li:nth-child(2) a").addClass("active");
			$("#body-slide-left").addClass("left-arrow-activated");
		}
		
		if (currentLocation > -1001) {
			$("#holder-slider").animate({
			'left': "-=1000"
			}, {queue: false}
			);
		}
	});
	
	$("#link-pane-1").click(function(){
		ReportGrid.tooltip && ReportGrid.tooltip.hide();
		$("#holder-slider").animate({
			'left': "0"
			}, {queue: false}
		);
		$("#body-slide-right").addClass("right-arrow-activated");
		$("#body-slide-left").removeClass("left-arrow-activated");
	});
	
	$("#link-pane-2").click(function(){
		ReportGrid.tooltip && ReportGrid.tooltip.hide();
		$("#holder-slider").animate({
			'left': "-1000"
			}, {queue: false}
		);
		$("#body-slide-right").addClass("right-arrow-activated");
		$("#body-slide-left").addClass("left-arrow-activated");
	});
	
	$("#link-pane-3").click(function(){
		ReportGrid.tooltip && ReportGrid.tooltip.hide();
		$("#holder-slider").animate({
			'left': "-2000"
			}, {queue: false}
		);
		$("#body-slide-left").addClass("left-arrow-activated");
		$("#body-slide-right").removeClass("right-arrow-activated");
	});

	var now = +new Date();
	var mentionsPerHour= "mentions := //fullcontact/tweets mentions' := mentions with {hour: std::time::hourOfDay(mentions.created_at)} where mentions.from_user != \"FullContactAPI\" results := solve 'hour {hour: 'hour, tweets: count(mentions'.hour where mentions'.hour = 'hour)} results";
	var mentionsByWeekday = "tweets := //fullcontact/tweets tweets' := tweets with {weekday: std::time::dayOfWeek(tweets.created_at)} solve 'weekday {weekday: 'weekday, mentions: count(tweets'.weekday where tweets'.weekday = 'weekday & tweets'.from_user != \"FullContactAPI\"), outgoing: count(tweets'.weekday where tweets'.weekday = 'weekday & tweets'.from_user = \"FullContactAPI\")}";
	var concepts ="concepts := //fullcontact/tweets solve 'concept{ concept: 'concept, relevance: mean(concepts.analysis.concept[0].relevance where concepts.analysis.concept[0].text = 'concept), count: count(concepts.analysis.concept[0].text where concepts.analysis.concept[0].text = 'concept) }";
	var category ="category := //fullcontact/tweets results := solve 'category{ category: 'category, score: mean(category.analysis.category.score where category.analysis.category.category = 'category), count: count(category.analysis.category.category where category.analysis.category.category = 'category) } results where results.category != \"unknown\"";
	var flow = 'tweets := //fullcontact/tweets {head: "mentions", count: count(tweets.from_user where tweets.from_user != "FullContactAPI"), tail: "totalTweets"} union {head: "outgoing tweets", count: count(tweets.from_user where tweets.from_user = "FullContactAPI"), tail: "totalTweets"} union {head: "retweets of FullContact", count: count(tweets.from_user where tweets.from_user != "FullContactAPI" & std::string::startsWith(tweets.text, "RT")), tail: "mentions"} union {head: "retweets by FullContact", count: count(tweets.from_user where tweets.from_user = "FullContactAPI" & std::string::startsWith(tweets.text, "RT")), tail: "outgoing tweets"}';
	
	$("#chart1").click(function(){
		window.open (  "https://labcoat.precog.com/?apiKey=9F23DEE0-0DB3-47DB-90FD-CBD2D421C8C0&basePath=%2F0000000069&analyticsService=https%3A%2F%2Fnebula.precog.com%2F&q=" + encodeURIComponent(mentionsPerHour)); 
	});
	$("#chart2").click(function(){
		window.open (  "https://labcoat.precog.com/?apiKey=9F23DEE0-0DB3-47DB-90FD-CBD2D421C8C0&basePath=%2F0000000069&analyticsService=https%3A%2F%2Fnebula.precog.com%2F&q=" + encodeURIComponent(mentionsByWeekday));
	});
	$("#chart3").click(function(){
		window.open ( "https://labcoat.precog.com/?apiKey=9F23DEE0-0DB3-47DB-90FD-CBD2D421C8C0&basePath=%2F0000000069&analyticsService=https%3A%2F%2Fnebula.precog.com%2F&q=" + encodeURIComponent(concepts));
	});
	$("#chart4").click(function(){
		window.open (  "https://labcoat.precog.com/?apiKey=9F23DEE0-0DB3-47DB-90FD-CBD2D421C8C0&basePath=%2F0000000069&analyticsService=https%3A%2F%2Fnebula.precog.com%2F&q=" + encodeURIComponent(category));
	});
	$("#chart5").click(function(){
		window.open (  "https://labcoat.precog.com/?apiKey=9F23DEE0-0DB3-47DB-90FD-CBD2D421C8C0&basePath=%2F0000000069&analyticsService=https%3A%2F%2Fnebula.precog.com%2F&q=" + encodeURIComponent(flow));
	});
	$("#chart6").click(function(){
		window.open (  "https://labcoat.precog.com/?apiKey=9F23DEE0-0DB3-47DB-90FD-CBD2D421C8C0&basePath=%2F0000000069&analyticsService=https%3A%2F%2Fnebula.precog.com%2F")
	});
	
	Precog.cache.setTimeout(60000);
	  
	ReportGrid.barChart("#chart1",{
		axes: ["hour","tweets"],
		load: ReportGrid.query.precog(mentionsPerHour).sortValue("hour"),
		options: {
			label:{
				datapointover: "mentions: @tweets",
				axis: function(t) { return ReportGrid.humanize(t); },
			},
			width: 450,
			ready: function(){
				jQuery("#chart1").removeClass("spinner")
			}
		}
	});

	ReportGrid.barChart("#chart2",{
		axes: ["weekday","count"],
		load: ReportGrid.query.precog(mentionsByWeekday)
		.transform(function(data) {
			var result = [],
				dp;
			for(var i = 0; i < data.length; i++){
				dp = data[i];
				result.push({ weekday: dp.weekday, type:"mentions", count : dp.mentions});
				result.push({weekday: dp.weekday, type:"outgoing", count : dp.outgoing});
			}
			return result;
			
        })
		.sortValue("weekday"),
		options: {
			label:{
				datapointover : "@type : @count",
				tickmark: function(v,t) { return t == "weekday" ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][v -1] : v}
			
			},
			width: 450,
			segmenton: "type",
			ready: function(){
				jQuery("#chart2").removeClass("spinner")
			}
		}
		});
	
	
	
	var values = [];
	for(var i = 1; i < 32; i++) {
		if(i < 10)
			values.push("0"+i);
		else
			values.push(""+i);
	}
	
	ReportGrid.pieChart("#chart3",{
		axes: ["category", "count"],
		load: ReportGrid.query.precog(category).sortValue("count"),
		options: {
			label:{
				datapoint : function(dp, stats) {
					return (dp.count / stats.tot) > 0.1 ? ReportGrid.humanize(dp.category) : null;
				},
				datapointover : function(dp ) {
					return  "Number of Tweets in "+ ReportGrid.humanize(dp.category)+": " + dp.count;
				}
			},
			width: 320,
			height: 320,
			labelradius: .20,
		}
		});
	
		ReportGrid.barChart("#chart4",{
		axes: ["concept", "count"],
		load: ReportGrid.query.precog(concepts)
		.sortValue("count", false)
		.limit(0, 15)
		.sortValue("count"),
		options: {
			label:{
				 datapointover : function(dp ) {
				return  "Number of Tweets: " + dp.count}
			},
			width:625,
			height: 320,
			horizontal: true,
		}
		});
		
		ReportGrid.sankey("#chart5",{
			axes: ["count"],
			load: ReportGrid.query.precog(flow),
			options: {
				label: {
					
				}
			},
			width: 750,
			height: 420
		});

		
	var recentSentiment = "import std::time::* mentions := //fullcontact/tweets nowMillis := "+ now + "  mentions' := mentions with {millis: getMillis(mentions.created_at)}  mentions'' := mentions' where mentions.from_user != \"FullContactAPI\" recent := mentions'' where mentions''.millis > (nowMillis - (1000*60*60*24)) mean(recent.analysis.sentiment.score)";
	var lastMention = "import std::time::* mentions := //fullcontact/tweets mentions' := mentions where mentions.from_user != \"FullContactAPI\" lastMention := mentions'.created_at where getMillis(mentions'.created_at) = max(getMillis(mentions'.created_at)) (" + now + " - getMillis(lastMention))/(1000*60*60)";
	var lastOutgoing = "import std::time::* tweets := //fullcontact/tweets replies := tweets where tweets.from_user = \"FullContactAPI\" lastOutgoing := replies.created_at where getMillis(replies.created_at) = max(getMillis(replies.created_at)) (" + now + " - getMillis(lastOutgoing))/(1000*60*60)";			
	var totalSentiment = "import std::time::* mentions := //fullcontact/tweets mentions' := mentions  where mentions.from_user != \"FullContactAPI\" mean(mentions'.analysis.sentiment.score)";
	var totalTweetsToday = "import std::time::* tweets := //fullcontact/tweets today := date(millisToISO(" + now + ", \"-07:00\")) count(tweets.created_at where date(tweets.created_at) = today) ";
	var totalRetweetsToday = "import std::time::* tweets := //fullcontact/tweets today := date(millisToISO(" + now + ", \"-07:00\")) retweets := tweets where std::string::startsWith(tweets.text, \"RT\") count(retweets.created_at where date(retweets.created_at) = today) ";
	var busiestDay = "tweets := //fullcontact/tweets tweets' := tweets with {weekday: std::time::dayOfWeek(tweets.created_at)} results := solve 'weekday {weekday: 'weekday, count: count(tweets'.weekday where tweets'.weekday = 'weekday)} results.weekday where results.count = max(results.count)";
	
	Precog.query(recentSentiment, function(data){
		jQuery("#recentSentiment").html("<h4>Net Recent Sentiment </h4>" +  ((data && data[0]) ? data[0].toFixed(2): "<p class='small-text'>insufficient activity</p>" )  + "<p class='mini'>(-1 to 1 scale)</p>");
			if(data[0] > .50){
		jQuery("#trending").html("<h4>Trending</h4><p class='mini'>massively positive</p>");
		}
		else if(data[0] > 0 ){
			jQuery("#trending").html("<h4>Trending</h4><p class='mini'>positive</p>");
		}
		else if(data[0] < -.50){
			jQuery("#trending").html("<h4>Trending</h4><p class='mini'>massively negative</p>");
		}
		else if(data[0] < 0 && data[0] >= -0.50){
			jQuery("#trending").html("<h4>Trending</h4><p class='mini'>negative</p>");
		}
		else jQuery("#trending").html("<h4>Trending</h4><p class='mini'>insufficient activity</p>");
	});
	Precog.query(lastMention, function(data){jQuery("#lastMention").html("<h4>Last Mention </h4><p>" + data[0].toFixed(1) + "</p><p class='mini'>(hours ago)</p>");});
	Precog.query(lastOutgoing, function(data){jQuery("#lastOutgoing").html("<h4>Last Outgoing </h4><p>" + data[0].toFixed(1) + "</p><p class='mini'>(hours ago)</p>"); });
	Precog.query(totalSentiment, function(data){jQuery("#totalSentiment").html("<h4>Total Net Sentiment </h4><p>" + data[0].toFixed(2) + "</p><p class='mini'>(-1 to 1 scale)</p>"); });
	Precog.query(totalTweetsToday, function(data){jQuery("#totalTweets").html("<h4>Total Tweets Today </h4>" + (data && data[0] ? data[0]: "<p class='small-text'>No Tweets Yet</p>"));});
	Precog.query(totalRetweetsToday, function(data){jQuery("#totalRetweets").html("<h4>Total Retweets Today </h4>" + (data && data[0] ? data[0]: "<p class='small-text'>No Retweets Yet</p>"));});  
		Precog.query(busiestDay, function(data){
		if(data[0] == 1){
			jQuery("#busiestDay").html("<h4>Busiest Day </h4><p> Monday</p>");
		} else if(data[0] ==2 ){
			jQuery("#busiestDay").html("<h4>Busiest Day </h4><p> Tuesday</p>");
		} else if(data[0] ==3 ){
			jQuery("#busiestDay").html("<h4>Busiest Day </h4><p> Wednesday</p>");
		} else if(data[0] ==4 ){
			jQuery("#busiestDay").html("<h4>Busiest Day </h4><p> Thursday</p>");
		} else if(data[0] ==5 ){
			jQuery("#busiestDay").html("<h4>Busiest Day </h4><p> Friday</p>");
		} else if(data[0] ==6 ){
			jQuery("#busiestDay").html("<h4>Busiest Day </h4><p> Saturday</p>");
		} else if(data[0] ==7 ){
			jQuery("#busiestDay").html("<h4>Busiest Day </h4><p> Sunday</p>");
		} else jQuery("#busiestDay").html("<h4>Busiest Day </h4><p> No Activity</p>");
				
	 });  
	
	var blacklist = ["that", "is", "a", "the", "it", "and", "have", "are", "i", "for", "of", "my", "we", "our", "to", "you", "in", "out", "@fullcontactapi", "this", "an", "how", "on", "go", "yet", "with", "take", "your", "rt", "via"],
		blacklistmap = {},
		maxSize = 0,
		minSize = Math.POSITIVE_INFINITY;
	blacklist.forEach(function(word) { blacklistmap[word] = true; });
	ReportGrid.query.precog("mentions := //fullcontact/tweets mentions.text")
		.transform(function(data) {
			var pattern = /(^[^a-z0-9#@]|[^a-z0-9#@]$|'s$)/ig;
			return data.join(" ").replace(/\s+/g, " ").split(" ").map(function(value){ return value.replace(pattern, "").toLowerCase(); });
		})
		.filter(function(value) {
			return !!value && !blacklistmap[value];
		})
		.transform(function(words) {
			var wordCounter = {};
			words.forEach(function(word){ wordCounter[word] ? wordCounter[word]++ : wordCounter[word] = 1; });
			var result = [];
			for(var key in wordCounter) {
				if(!wordCounter.hasOwnProperty(key)) continue;
				result.push({ text : key, size : wordCounter[key] });
			}
			return result;
		})
		.sortValue("size", false)
		.limit(0, 50)
		.map(function(o){
			if (o.size > maxSize){
				maxSize = o.size;
			}
			if (o.size < minSize){
				minSize = o.size;
			}
			return o;
		})
		.execute(function(words){
			renderLeaderBoard(words);
		//	renderWordCloud(words);
			
			
		}
	);
	function renderLeaderBoard(data){
		ReportGrid.leaderBoard("#chart6", {
			axes: ["text", "size"],
			load: ReportGrid.query.data(data)
					.limit(0,10),
			options: {
				label:{
				},
			}
		});
	}
	
	function renderWordCloud(words){
		var fill = d3.scale.category20(); //this is doing the current color scheme, can replace
			
			console.log(words);
			var deltaSize = maxSize - minSize;
			d3.layout.cloud().size([800, 800])
				.words(words)
				.rotate(function() { return ~~(Math.random() * 2) * 90 ; })
				.font("Impact")
				.fontSize(function(d) { return ((d.size-minSize)/deltaSize)*70 + 10; })
				.on("end", draw)
				.start();
		  
			function draw(words) {
			  d3.select("#chart6").append("svg")
				  .attr("width", 750)
				  .attr("height", 500)
				.append("g")
				  .attr("transform", "translate(375,250)")
				.selectAll("text")
				  .data(words)
				.enter().append("text")
				  .style("font-size", function(d) { return d.size + "px"; })
				  .style("font-family", "Impact")
				  .style("fill", function(d, i) { return fill(i); })
				  .attr("text-anchor", "middle")
				  .attr("transform", function(d) {
					return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
				  })
				  .text(function(d) { return d.text; });
			}
	}
	
	setTimeout(function(){
		var currentValue= jQuery("#trending p.mini").html();
		
		if (currentValue == "positive" ) {
			jQuery("#trending").addClass("positive");
		} else if (currentValue == "massively positive") {
			jQuery("#trending").addClass("massively-positive");
		} else if (currentValue == "massively negative") {
			jQuery("#trending").addClass("massively-negative");
		} else if (currentValue == "negative") {
			jQuery("#trending").addClass("negative");
		}else if (currentValue == "insufficient activity") {
			jQuery("#trending").addClass("insufficient");
		}
	}, 20000);
	
	

	

});

