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
			'left': "-" + (windowWidth + 20) + "px"
		});
		
		$("#body-slide-right").css({
			'width': windowWidth + "px",
			'right': "-" + (windowWidth + 20) + "px"
		});
	}
	
	sidePanelResize();
	$(window).resize(sidePanelResize);
	
	$("#body-slide-left").click(function(){
		var currentLocation = parseInt($("#holder-slider").css("left"));
		$("#body-menu ul li a").removeClass("active");
		
		if (currentLocation == 0) {
			$("#body-menu ul li:nth-child(1) a").addClass("active");
		} else if (currentLocation == -1000) {
			$("#body-menu ul li:nth-child(1) a").addClass("active");
		} else if(currentLocation == -2000) {
			$("#body-menu ul li:nth-child(2) a").addClass("active");
		}
		
		if (currentLocation < -999) {
			$("#holder-slider").animate({
			'left': "+=1000"
			}, {queue: false}
			);
		}
	});
	
	$("#body-slide-right").click(function(){
		var currentLocation = parseInt($("#holder-slider").css("left"));
		$("#body-menu ul li a").removeClass("active");
		
		if (currentLocation == -2000) {
			$("#body-menu ul li:nth-child(3) a").addClass("active");
		} else if (currentLocation == -1000) {
			$("#body-menu ul li:nth-child(3) a").addClass("active");
		} else if(currentLocation == 0) {
			$("#body-menu ul li:nth-child(2) a").addClass("active");
		}
		
		if (currentLocation > -1001) {
			$("#holder-slider").animate({
			'left': "-=1000"
			}, {queue: false}
			);
		}
	});
	
	$("#link-pane-1").click(function(){
		$("#holder-slider").animate({
			'left': "0"
			}, {queue: false}
		);
	});
	
	$("#link-pane-2").click(function(){
		$("#holder-slider").animate({
			'left': "-1000"
			}, {queue: false}
		);
	});
	
	$("#link-pane-3").click(function(){
		$("#holder-slider").animate({
			'left': "-2000"
			}, {queue: false}
		);
	});

	var now = +new Date();
	console.log(now);
	var mentionsPerHour= "mentions := //demo/test/1 mentions' := mentions with {hour: std::time::hourOfDay(mentions.created_at)} where mentions.from_user != \"FullContactApp\" solve 'hour {hour: 'hour, count: count(mentions'.hour where mentions'.hour = 'hour)}";
	var mentionsByWeekday = "mentions := //demo/test/1 mentions' := mentions with {weekday: std::time::dayOfWeek(mentions.created_at)} where mentions.from_user != \"FullContactApp\" solve 'weekday {weekday: 'weekday, count: count(mentions'.weekday where mentions'.weekday = 'weekday)}";
	var heatGrid = "sentiment := //socialsauce/sentiment/2 solve 'hour, 'day {hour: 'hour, day: 'day, sentiment: sum(sentiment.sentiment where sentiment.hour = 'hour & sentiment.day='day)}";
	var heatGrid2 = "sentiment := //socialsauce/sentiment/2 solve 'hour, 'day {hour: 'hour, weekday: 'day, sentiment: sum(sentiment.sentiment where sentiment.hour = 'hour & sentiment.weekday='day)}";
	var stats = 'sentiment := //socialsauce/sentiment/2 {stat: "standardDeviation", value: stdDev(sentiment.sentiment)} union {stat: "max", value: max(sentiment.sentiment)} union {stat: "min", value: min(sentiment.sentiment)} union {stat: "averageSentiment", value: mean(sentiment.sentiment)}';

	ReportGrid.barChart("#chart1",{
		axes: ["hour","count"],
		load: ReportGrid.query.precog(mentionsPerHour).sortValue("hour"),
		options: {
			label:{
				title: "Mentions By Hour"
			},
			width: 450
		}
		});

	ReportGrid.barChart("#chart2",{
		axes: ["weekday","count"],
		load: ReportGrid.query.precog(mentionsByWeekday).sortValue("weekday"),
		options: {
			label:{
				title: "Mentions By Weekday"
			},
			width: 450
		}
		});
	var values = [];
	for(var i = 1; i < 32; i++) {
		if(i < 10)
			values.push("0"+i);
		else
			values.push(""+i);
	}
	
	ReportGrid.heatGrid("#chart3",{
		axes: [{"type":"day", values: values},{"type":"hour"},{"type":"sentiment"}],
		load: ReportGrid.query.precog(heatGrid).sortValue("hour"),
		options: {
			label:{
				title: "Sentiment HeatGrid"
			},
			width: 500
		}
		});
	
	ReportGrid.heatGrid("#chart4",{
		axes: [{"type":"weekday", values: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]},{"type":"hour"},{"type":"sentiment"}],
		load: ReportGrid.query.precog(heatGrid2).sortValue("hour"),
		options: {
			label:{
				title: "HeatGrid 2"
			},
			width: 150
		}
		});

	
	ReportGrid.barChart("#chart5",{
		axes: ["stat", "value"],
		load: ReportGrid.query.precog(stats),
		options: {
			label:{
				title: "Stats"
			},
			width: 300,
			displayrules: true
		},
		horizontal: true
		});
	
		
	var metric1 = "import std::time::* mentions := //demo/test/1 nowMillis := "+ now + "  mentions' := mentions with {millis: getMillis(mentions.created_at)} lastHour := mentions' where mentions'.millis > (nowMillis - (1000*60*600000)) mean(lastHour.analysis.sentiment.score)";
	//make sure to correct query, right now it goes artificially far back in time to compensate for non streaming data
	
	var metric2 = "import std::time::* mentions := //demo/test/1 mentions' := mentions where mentions.from_user != \"FullContactApp\" lastMention := mentions'.created_at where getMillis(mentions'.created_at) = max(getMillis(mentions'.created_at)) std::math::round((" + now + " - getMillis(lastMention))/(1000*60))";
	
	var metric3 = "import std::time::* mentions := //demo/test/1 mentions' := mentions where mentions.from_user = \"FullContactApp\" & std::string::startsWith(mentions.text, \"@\") lastReply := mentions'.created_at where getMillis(mentions'.created_at) = max(getMillis(mentions'.created_at)) std::math::round((" + now + " - getMillis(lastReply))/(1000*60))";			
		
	var metric5 = ""+Math.round(Math.random()*10000);
	
	Precog.query(metric1, function(data){
		jQuery("#metric1").html("<h4>Net Sentiment Last Hour </h4><p>" +  data[0].toFixed(2)  + "</p>");
			if(data[0] > .75){
		jQuery("#metric4").html("<h4>Trending</h4><span>massively positive</span>");
		}
		else if(data[0] > 0 ){
			jQuery("#metric4").html("<h4>Trending</h4><span>positive</span>");
		}
		else if(data[0] < -.75){
			jQuery("#metric4").html("<h4>Trending</h4><span>massively negative</span>");
		}
		else{
			jQuery("#metric4").html("<h4>Trending</h4><span>negative</span>");
	}
		});
	Precog.query(metric2, function(data){jQuery("#metric2").html("<h4>Last Mention </h4><p>" + data[0] + "</p><span>(minutes ago)</span>"); });
	Precog.query(metric3, function(data){jQuery("#metric3").html("<h4>Last Reply </h4><p>" + data[0] + "</p><span>(minutes ago)</span>");
				 console.log(data[0]);
				 });
	Precog.query(metric5, function(data){jQuery("#metric5").html("<h4>Current Reach </h4><p>" + data + "</p>");});

		
	var currentValue= $("#metric4 span").html();
	console.log(currentValue);
		
	if (currentValue == "positive" ) {
		$("#metric4").addClass("positive");
	} else if (currentValue == "massively positive") {
		$("#metric4").addClass("massively-positive");
	} else if (currentValue == "massively negative") {
		$("#metric4").addClass("massively-negative");
	} else if (currentValue == "negative") {
		$("#metric4").addClass("negative");
	}
	Precog.query("mentions := //demo/test/1 mentions.text", function(data){	 
		console.log(data[0]);
		var blacklist = ["that", "is", "a", "the", "it", "and", "have", "are", "i", "for", "of", "my", "we", "our", "to", "you", "in", "out"],
			blacklistmap = {};
			wordCounter = {};
		blacklist.forEach(function(word) { blacklistmap[word] = true; });
		var words = data.join(" ").split(" ").map(function(value){ return value.replace(/(^[^a-z0-9#@]|[^a-z0-9#@]$)/ig, "").toLowerCase(); }).filter(function(value) { return !!value && !blacklistmap[value]; });
		console.log(words);
		words.forEach(function(word){ wordCounter[word] ? wordCounter[word]++ : wordCounter[word] = 1; });
		console.log(wordCounter);
//		var top25 = wordCounter.text.filter(function(value){return })
		var fill = d3.scale.category20();
		words = [];
		for(var key in wordCounter) {
			if(!wordCounter.hasOwnProperty(key)) continue;
			words.push({ text : key, size : wordCounter[key] });
		}
		console.log(words);
		d3.layout.cloud().size([300, 300])
			.words(words)
			.rotate(function() { return ~~(Math.random() * 2) * 90; })
			.font("Impact")
			.fontSize(function(d) { return d.size; })
			.on("end", draw)
			.start();
	  
		function draw(words) {
		  d3.select("#chart6").append("svg")
			  .attr("width", 450)
			  .attr("height", 450)
			.append("g")
			  .attr("transform", "translate(150,150)")
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
  );

});