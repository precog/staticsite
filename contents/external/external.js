jQuery(document).ready(function(){

    var currentUrl = window.location.pathname;
    
    if (currentUrl == "/12daysofreportgrid") {
    
    jQuery(".right-days li").mouseenter(function(){
        var currentDay = jQuery(this).attr('class').substr(3);
        var nimageDay = ("url(http://www.precog.com/external/12daysofreportgrid/graphic-12dorg-present" + currentDay + "-alt.png)")
        
        jQuery(this).css("background-image", nimageDay);
        
        }).mouseleave(function(){
        var currentDay = jQuery(this).attr('class').substr(3);
        
        jQuery(this).css("background-image", "url(http://www.precog.com/external/12daysofreportgrid/graphic-12dorg-present" + currentDay + ".png)");
    });
    
    jQuery(".right-days li").click(function(){
        activeClass = jQuery(this).attr('class');
        
        jQuery(".right-days li").removeClass('active')
        
        jQuery("#content-charts li.hideme").animate({
            'opacity': '0.0',
            'z-index': '0'
        }, { queue: false, duration: 1000 });
        if(ReportGrid.tooltip) ReportGrid.tooltip.hide();
        jQuery("#content-charts li." + activeClass).animate({
            'opacity': '1.0',
            'z-index': '1'
        }, { queue: false, duration: 1000 });
        
        jQuery(".right-days li." + activeClass).addClass('active')
    });
    
    /*SANKEY CHART*/
    var charts = [
        function(ready){
          var query = "clicks := //clicks conversions := //conversions {head: \"male clicks\", actions: count(clicks.timeStamp where clicks.customer.gender= \"male\"), tail: \"total clicks\"} union {head: \"female clicks\", actions: count(clicks.timeStamp where clicks.customer.gender= \"female\"), tail: \"total clicks\"} union {head: \"male conversions\", actions: count(conversions.timeStamp where conversions.customer.gender= \"male\"), tail: \"male clicks\"} union {head: \"female conversions\", actions: count(conversions.timeStamp where conversions.customer.gender= \"female\"), tail: \"female clicks\"}";
          ReportGrid.sankey("#sankey",{
              axes: ["actions"],
              load: ReportGrid.query.precog(query),
              options: {
                width: 660,
                height: 360,
                ready : ready
              }
           });
        }, function(ready) {
          var query = "clicks := //clicks clicks' := clicks with {month: std::time::monthOfYear(clicks.timeStamp)} solve 'month {month: 'month, clicks: count(clicks'.product.price where clicks'.month = 'month)}";
          ReportGrid.lineChart("#lineChart",{
            axes: ["month","clicks"],
            load: ReportGrid.query.precog(query).sortValue("month"),
            options: {
              width: 660,
              height: 360,
              interpolation: "basis",
              symbol: ReportGrid.symbol("circle", 100),
              displayrules: true,
              ready : ready
            }
          });
        }, function(ready) {
          var query = "conversions := //conversions solve 'gender, 'gamer {gender: 'gender, gamer: 'gamer, conversions: count(conversions.customer.ID where conversions.customer.gender = 'gender & conversions.customer.isCasualGamer= 'gamer)}";
          ReportGrid.barChart("#barChart",{
            axes: ["gender","conversions"],
            load: ReportGrid.query.precog(query),
            options: {
              label:{
                datapointover: "@(gamer?'gamer':'not a gamer') (@gender): @conversions"
              },
              width: 660,
              height: 360,
              padding: {top: 20},
              stacked: false,
              segmenton: "gamer",
              barpadding: 50,
              barpaddingdatapoint: 10,
              effect: "gradient:0.8",
              ready : ready
            }
          });
        }, function(ready) {
          var scatterGraph = "conversions := //conversions {age: conversions.customer.age, income: conversions.customer.income} where conversions.customer.age != null & conversions.customer.income != null";
          ReportGrid.scatterGraph("#scatterGraph",{
            axes: ["age","income"],
            load: ReportGrid.query.precog(scatterGraph).sortValue("age"),
            options: {
              width: 660,
              height: 360,
              ready : ready
            }
          });
        }, function(ready) {
          var funnelChart = "clicks := //clicks conversions := //conversions impressions := 367052 {event: \"impressions\", count: impressions} union {event: \"conversions\", count: count(conversions.product.price)} union {event: \"clicks\", count: count(clicks.product.price)}";
          ReportGrid.funnelChart("#funnelChart",{
            axes: ["event","count"],
            load: ReportGrid.query.precog(funnelChart).sortValue("count").reverse(),
            options: {
              width: 360,
              height: 360,
              ready : ready
            }
          });
        }, function(ready) {
          var leaderBoard = "data := //conversions salesByProduct := solve 'product {product: 'product, sales: sum(data.product.price where data.product.ID = 'product)} rank := std::stats::rank(neg salesByProduct.sales) salesByProduct where rank <= 5";
          ReportGrid.leaderBoard("#leaderBoard",{
            axes: ["product","sales"],
            load: ReportGrid.query.precog(leaderBoard).sortValue("sales").reverse(),
            options: {
              label:{
                datapoint: "@product"
              },
              width: 660,
              height: 420,
              ready : ready
            }
          });
        }, function(ready) {
          ReportGrid.heatGrid("#heatGrid", {
          axes : [{"type":"hour"},{"type":"day"},{"type":"count"}],
          load : ReportGrid.query.data([{"hour":0,"day":1,"count":97},{"hour":0,"day":2,"count":114},{"hour":0,"day":3,"count":107},{"hour":0,"day":4,"count":100},{"hour":0,"day":5,"count":82},{"hour":0,"day":6,"count":64},{"hour":0,"day":7,"count":83},{"hour":1,"day":1,"count":89},{"hour":1,"day":2,"count":101},{"hour":1,"day":3,"count":110},{"hour":1,"day":4,"count":93},{"hour":1,"day":5,"count":95},{"hour":1,"day":6,"count":53},{"hour":1,"day":7,"count":84},{"hour":2,"day":1,"count":73},{"hour":2,"day":2,"count":138},{"hour":2,"day":3,"count":107},{"hour":2,"day":4,"count":125},{"hour":2,"day":5,"count":110},{"hour":2,"day":6,"count":62},{"hour":2,"day":7,"count":75},{"hour":3,"day":1,"count":77},{"hour":3,"day":2,"count":94},{"hour":3,"day":3,"count":101},{"hour":3,"day":4,"count":92},{"hour":3,"day":5,"count":117},{"hour":3,"day":6,"count":61},{"hour":3,"day":7,"count":64},{"hour":4,"day":1,"count":75},{"hour":4,"day":2,"count":104},{"hour":4,"day":3,"count":119},{"hour":4,"day":4,"count":88},{"hour":4,"day":5,"count":90},{"hour":4,"day":6,"count":69},{"hour":4,"day":7,"count":85},{"hour":5,"day":1,"count":82},{"hour":5,"day":2,"count":114},{"hour":5,"day":3,"count":129},{"hour":5,"day":4,"count":102},{"hour":5,"day":5,"count":81},{"hour":5,"day":6,"count":59},{"hour":5,"day":7,"count":69},{"hour":6,"day":1,"count":106},{"hour":6,"day":2,"count":124},{"hour":6,"day":3,"count":137},{"hour":6,"day":4,"count":127},{"hour":6,"day":5,"count":111},{"hour":6,"day":6,"count":65},{"hour":6,"day":7,"count":81},{"hour":7,"day":1,"count":116},{"hour":7,"day":2,"count":216},{"hour":7,"day":3,"count":184},{"hour":7,"day":4,"count":189},{"hour":7,"day":5,"count":133},{"hour":7,"day":6,"count":85},{"hour":7,"day":7,"count":116},{"hour":8,"day":1,"count":144},{"hour":8,"day":2,"count":290},{"hour":8,"day":3,"count":242},{"hour":8,"day":4,"count":230},{"hour":8,"day":5,"count":186},{"hour":8,"day":6,"count":99},{"hour":8,"day":7,"count":133},{"hour":9,"day":1,"count":167},{"hour":9,"day":2,"count":303},{"hour":9,"day":3,"count":249},{"hour":9,"day":4,"count":223},{"hour":9,"day":5,"count":184},{"hour":9,"day":6,"count":98},{"hour":9,"day":7,"count":99},{"hour":10,"day":1,"count":168},{"hour":10,"day":2,"count":326},{"hour":10,"day":3,"count":277},{"hour":10,"day":4,"count":225},{"hour":10,"day":5,"count":218},{"hour":10,"day":6,"count":154},{"hour":10,"day":7,"count":132},{"hour":11,"day":1,"count":174},{"hour":11,"day":2,"count":296},{"hour":11,"day":3,"count":267},{"hour":11,"day":4,"count":221},{"hour":11,"day":5,"count":185},{"hour":11,"day":6,"count":102},{"hour":11,"day":7,"count":137},{"hour":12,"day":1,"count":174},{"hour":12,"day":2,"count":270},{"hour":12,"day":3,"count":207},{"hour":12,"day":4,"count":221},{"hour":12,"day":5,"count":162},{"hour":12,"day":6,"count":108},{"hour":12,"day":7,"count":115},{"hour":13,"day":1,"count":209},{"hour":13,"day":2,"count":307},{"hour":13,"day":3,"count":326},{"hour":13,"day":4,"count":252},{"hour":13,"day":5,"count":215},{"hour":13,"day":6,"count":122},{"hour":13,"day":7,"count":154},{"hour":14,"day":1,"count":218},{"hour":14,"day":2,"count":363},{"hour":14,"day":3,"count":325},{"hour":14,"day":4,"count":274},{"hour":14,"day":5,"count":238},{"hour":14,"day":6,"count":106},{"hour":14,"day":7,"count":166},{"hour":15,"day":1,"count":224},{"hour":15,"day":2,"count":351},{"hour":15,"day":3,"count":328},{"hour":15,"day":4,"count":281},{"hour":15,"day":5,"count":220},{"hour":15,"day":6,"count":117},{"hour":15,"day":7,"count":154},{"hour":16,"day":1,"count":193},{"hour":16,"day":2,"count":343},{"hour":16,"day":3,"count":299},{"hour":16,"day":4,"count":247},{"hour":16,"day":5,"count":206},{"hour":16,"day":6,"count":126},{"hour":16,"day":7,"count":144},{"hour":17,"day":1,"count":179},{"hour":17,"day":2,"count":298},{"hour":17,"day":3,"count":275},{"hour":17,"day":4,"count":240},{"hour":17,"day":5,"count":189},{"hour":17,"day":6,"count":111},{"hour":17,"day":7,"count":118},{"hour":18,"day":1,"count":135},{"hour":18,"day":2,"count":260},{"hour":18,"day":3,"count":226},{"hour":18,"day":4,"count":209},{"hour":18,"day":5,"count":164},{"hour":18,"day":6,"count":107},{"hour":18,"day":7,"count":117},{"hour":19,"day":1,"count":111},{"hour":19,"day":2,"count":192},{"hour":19,"day":3,"count":183},{"hour":19,"day":4,"count":173},{"hour":19,"day":5,"count":137},{"hour":19,"day":6,"count":78},{"hour":19,"day":7,"count":116},{"hour":20,"day":1,"count":95},{"hour":20,"day":2,"count":170},{"hour":20,"day":3,"count":168},{"hour":20,"day":4,"count":139},{"hour":20,"day":5,"count":108},{"hour":20,"day":6,"count":70},{"hour":20,"day":7,"count":77},{"hour":21,"day":1,"count":94},{"hour":21,"day":2,"count":122},{"hour":21,"day":3,"count":117},{"hour":21,"day":4,"count":123},{"hour":21,"day":5,"count":81},{"hour":21,"day":6,"count":66},{"hour":21,"day":7,"count":79},{"hour":22,"day":1,"count":89},{"hour":22,"day":2,"count":128},{"hour":22,"day":3,"count":112},{"hour":22,"day":4,"count":104},{"hour":22,"day":5,"count":108},{"hour":22,"day":6,"count":62},{"hour":22,"day":7,"count":71},{"hour":23,"day":1,"count":86},{"hour":23,"day":2,"count":134},{"hour":23,"day":3,"count":110},{"hour":23,"day":4,"count":114},{"hour":23,"day":5,"count":102},{"hour":23,"day":6,"count":66},{"hour":23,"day":7,"count":75}]),
          options : {
            width: 660,
            height: 220,
            yscaleposition: "left",
            labelhorizontal: false,
            label: {
              axis: "@humanize(type)",
              datapoint: "",
              ready : ready
            }
          }
        });
        }, function(ready) {
          ReportGrid.pivotTable("#pivotTable", {
            axes : [{"type":"hour"},{"type":"day"},{"type":"count"}],
            load : ReportGrid.query.data([{"hour":0.0,"day":1,"count":186},{"hour":0.0,"day":2,"count":215},{"hour":0.0,"day":3,"count":217},{"hour":0.0,"day":4,"count":193},{"hour":0.0,"day":5,"count":177},{"hour":0.0,"day":6,"count":117},{"hour":0.0,"day":7,"count":167},{"hour":2.0,"day":1,"count":150},{"hour":2.0,"day":2,"count":232},{"hour":2.0,"day":3,"count":208},{"hour":2.0,"day":4,"count":217},{"hour":2.0,"day":5,"count":227},{"hour":2.0,"day":6,"count":123},{"hour":2.0,"day":7,"count":139},{"hour":4.0,"day":1,"count":157},{"hour":4.0,"day":2,"count":218},{"hour":4.0,"day":3,"count":248},{"hour":4.0,"day":4,"count":190},{"hour":4.0,"day":5,"count":171},{"hour":4.0,"day":6,"count":128},{"hour":4.0,"day":7,"count":154},{"hour":6.0,"day":1,"count":222},{"hour":6.0,"day":2,"count":340},{"hour":6.0,"day":3,"count":321},{"hour":6.0,"day":4,"count":316},{"hour":6.0,"day":5,"count":244},{"hour":6.0,"day":6,"count":150},{"hour":6.0,"day":7,"count":197},{"hour":8.0,"day":1,"count":311},{"hour":8.0,"day":2,"count":593},{"hour":8.0,"day":3,"count":491},{"hour":8.0,"day":4,"count":453},{"hour":8.0,"day":5,"count":370},{"hour":8.0,"day":6,"count":197},{"hour":8.0,"day":7,"count":232},{"hour":10.0,"day":1,"count":342},{"hour":10.0,"day":2,"count":622},{"hour":10.0,"day":3,"count":544},{"hour":10.0,"day":4,"count":446},{"hour":10.0,"day":5,"count":403},{"hour":10.0,"day":6,"count":256},{"hour":10.0,"day":7,"count":269},{"hour":12.0,"day":1,"count":383},{"hour":12.0,"day":2,"count":577},{"hour":12.0,"day":3,"count":533},{"hour":12.0,"day":4,"count":473},{"hour":12.0,"day":5,"count":377},{"hour":12.0,"day":6,"count":230},{"hour":12.0,"day":7,"count":269},{"hour":14.0,"day":1,"count":442},{"hour":14.0,"day":2,"count":714},{"hour":14.0,"day":3,"count":653},{"hour":14.0,"day":4,"count":555},{"hour":14.0,"day":5,"count":458},{"hour":14.0,"day":6,"count":223},{"hour":14.0,"day":7,"count":320},{"hour":16.0,"day":1,"count":372},{"hour":16.0,"day":2,"count":641},{"hour":16.0,"day":3,"count":574},{"hour":16.0,"day":4,"count":487},{"hour":16.0,"day":5,"count":395},{"hour":16.0,"day":6,"count":237},{"hour":16.0,"day":7,"count":262},{"hour":18.0,"day":1,"count":246},{"hour":18.0,"day":2,"count":452},{"hour":18.0,"day":3,"count":409},{"hour":18.0,"day":4,"count":382},{"hour":18.0,"day":5,"count":301},{"hour":18.0,"day":6,"count":185},{"hour":18.0,"day":7,"count":233},{"hour":20.0,"day":1,"count":189},{"hour":20.0,"day":2,"count":292},{"hour":20.0,"day":3,"count":285},{"hour":20.0,"day":4,"count":262},{"hour":20.0,"day":5,"count":189},{"hour":20.0,"day":6,"count":136},{"hour":20.0,"day":7,"count":156},{"hour":22.0,"day":1,"count":175},{"hour":22.0,"day":2,"count":262},{"hour":22.0,"day":3,"count":222},{"hour":22.0,"day":4,"count":218},{"hour":22.0,"day":5,"count":210},{"hour":22.0,"day":6,"count":128},{"hour":22.0,"day":7,"count":146}]),
            options : {
              ready : ready
            }
          });
        }, function(ready) {
          ReportGrid.streamGraph("#streamGraph", {
            axes : [{"type":"hour"},{"type":"conversions"}],
            load : ReportGrid.query.request("https://labcoat.precog.com/analytics/v1/fs/?apiKey=5CDA81E8-9817-438A-A340-F34E578E86F8&q=clicks%20%3A%3D%20%2F%2Fclicks%20clicks'%20%3A%3D%20clicks%20with%20%7Bhour%3A%20std%3A%3Atime%3A%3AhourOfDay(clicks.timeStamp)%7D%20solve%20'ref%2C%20'hour%20%7Breferral%3A%20'ref%2C%20hour%3A%20'hour%2C%20conversions%3A%20count(clicks'.timeStamp%20where%20clicks'.marketing.referral%20%3D%20'ref%20%26%20clicks'.hour%20%3D%20'hour)%20%7D").sortValue("hour"),
            options : {
              width: 660,
              height: 350,
              label: {
                datapointover: "@referral: @conversions"
              },
              segmenton: "referral",
              interpolation: "cardinal:0.75",
              ready : ready
            }
          });
        }, function(ready) {
          ReportGrid.pieChart("#pieChart", {
            axes : [{"type":"referral"},{"type":"conversions"}],
            load : ReportGrid.query.data([{"referral":"","conversions":306},{"referral":"athenaGames.com","conversions":7157},{"referral":"direct","conversions":8912},{"referral":"gomtv.com","conversions":560},{"referral":"justintv.com","conversions":964},{"referral":"otherWebsite","conversions":956},{"referral":"search","conversions":4325},{"referral":"teamliquid.net","conversions":1263},{"referral":"twitchtv.com","conversions":884},{"referral":"xkcd.com","conversions":79}]),
            options : {
              width: 360,
              height: 360,
              innerradius: 0,
              ready : ready
            }
          });
        }, function(ready) {
          var query = "import std::time::* conversions := //conversions conversions' := conversions with { month: monthOfYear(conversions.timeStamp) } blog := solve 'month { month: 'month, views: sum(conversions'.marketing.blogViews where conversions'.month = 'month), type: \"blog\" } page := solve 'month { month: 'month, views: sum(conversions'.marketing.pageViews where conversions'.month = 'month), type: \"page\" } blog union page";
          ReportGrid.lineChart("#lineChart2", {
            axes : ["month","views"],
            load: ReportGrid.query.data([{"type":"page","views":3190655,"month":1},{"type":"blog","views":342727,"month":1},{"type":"page","views":4526688,"month":2},{"type":"blog","views":436616,"month":2},{"type":"blog","views":980883,"month":3},{"type":"blog","views":598403,"month":4},{"type":"blog","views":545617,"month":5},{"type":"blog","views":635490,"month":6},{"type":"blog","views":475520,"month":7},{"type":"blog","views":405224,"month":8},{"type":"blog","views":364210,"month":9},{"type":"blog","views":216637,"month":10},{"type":"blog","views":1151284,"month":11},{"type":"blog","views":1481640,"month":12},{"type":"page","views":8382353,"month":3},{"type":"page","views":5790355,"month":4},{"type":"page","views":4508778,"month":5},{"type":"page","views":5827033,"month":6},{"type":"page","views":4519078,"month":7},{"type":"page","views":3961628,"month":8},{"type":"page","views":3416011,"month":9},{"type":"page","views":2013198,"month":10},{"type":"page","views":11673411,"month":11},{"type":"page","views":14765552,"month":12}]),
            options : {
              label : {
                axis : function(a) { return a; },
                tickmark : function(v, a) { return a == 'month' ? v: ReportGrid.format(v); },
                datapointover : function(dp, stats) {
                  return ReportGrid.humanize(dp.type) + ": " + ReportGrid.format(dp.views);
                }
              },
              labelangle : function(a) { return a == "month" ? 140 : 0; },
              labelanchor : function(a) {
                return (a == "pageViews" || a == "month") ? "left" : "right";
              },
              displayarea : true,
              displaytickmajor: false,
              height: 360,
              width: 660,
              segmenton: "type",
              ready : ready
            }
          });
        }, function(ready) {
          ReportGrid.barChart("#barChart2", {
            axes : [{"type":"product"},{"type":"conversions","variable":"dependent"}],
            load : ReportGrid.query.request("https://labcoat.precog.com/analytics/v1/fs/?apiKey=5CDA81E8-9817-438A-A340-F34E578E86F8&q=conversions%20%3A%3D%20%2F%2Fconversions%20solve%20'gender%2C%20'product%20%7B%20gender%3A%20'gender%2C%20product%3A%20'product%2C%20conversions%3A%20count(conversions.product.ID%20where%20conversions.product.ID%20%3D%20'product%20%26%20conversions.customer.gender%20%3D%20'gender)%20%7D"),
            options : {
              width: 660,
              height: 360,
              label: {
                datapointover: "@gender conversions: @conversions",
                tickmark: "@value"
              },
              segmenton: "gender",
              stacked: true,
              ready : ready,
              horizontal: true
            }
          });
        }];

  while(charts.length > 0) {
    try{
        charts.shift()(function(){});
    } catch(e){
        console.log(e);
    };
  };
    
    } else if (currentUrl == "/2013-oscars") {
    
        jQuery.getScript("https://api.reportgrid.com/js/precog.js?apiKey=DB9A9D36-250D-4E82-84FD-11BF3C3EECED&analyticsService=http://nebula.precog.com/&basePath=/0000000069/", function(){
        jQuery('head').append('<link rel="stylesheet" href="https://api.reportgrid.com/css/colors/rg-colors-ylorrd-3-seq.css">');
         
            /*OSCARS*/
            var charts = [
            function(ready) {
        
            var whiteList = ["amour","argo", "beasts of the southern wild", "lincoln", "django unchained", "les miserables", "life of pi", "silver linings playbook", "zero dark thirty", "les mis"],
                regexlist = whiteList.map(function(s){
                  return new RegExp("\\b" + s + "\\b", "");
                }),
                maxSize = 0,
                minSize = Math.POSITIVE_INFINITY;
                var highestCount = 0;
              ReportGrid.query.precog("tweets := //oscarGeo3/*/tweets tweets.text where tweets.sentiment =\"positive\"")
                .transform(function(data) {
                  var results = [];
                  for(var j = 0; j < data.length; j++) {
                    var s = data[j].toLowerCase();
                    for(var i = 0; i < whiteList.length; i++) {
                      //if(s.indexOf(whiteList[i]) >= 0)
                        if(regexlist[i].test(s)) 
                          results.push(whiteList[i]);
                    }
                  }
                  return results;
                })
                /*
                .transform(function(data) {
                  var pattern = /(^[^a-z0-9#@]|[^a-z0-9#@]$|'s$)/ig;
                  return data.join(" ").replace(/\s+/g, " ").split(" ").map(function(value){ return value.replace(pattern, "").toLowerCase(); });
                })
                .filter(function(value) {
                  if (value === "watch") {
                    console.log(whiteListmap);
                    console.log(value, !!whiteListmap[value]);
                  }
                  return whiteListmap.hasOwnProperty(value) && !!whiteListmap[value];
                })
            */
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
             //   .sortValue("size", false)
                .limit(0, 50)
                .map(function(o){
                  if (o.size > maxSize){
                    maxSize = o.size;
                  }
                  if (o.size < minSize){
                    minSize = o.size;
                  }
                  console.log(o);
               //   var highestCount = o.size;
                 // for(i = 0; i < o.length; i++){
                  highestCount = Math.max(highestCount, o.size);
               //   }
                  
                  console.log(highestCount);
                  return o;
                })
                .execute(function(words){
                  renderBarChart(words);
                  renderScatterplot(words);
                //  renderWordCloud(words);
                  
                  
                }
              );
              function renderBarChart(data){
                ReportGrid.barChart("#oscars-leaderboard", {
                  axes: ["text", {type: "size", view: [0,highestCount*1.1]}],
                  load: ReportGrid.query.data(data)
                      .limit(0,10),
                  options: {
                    label:{
                    },
                    height: 413,
                    width: 455,
                    horizontal: true
                  }
                });
              }
              function renderScatterplot(data){
                ReportGrid.lineChart("#oscars-leaderboard", {
                  axes: [{type: "size", variable: "dependent", scalemode: "fill", view: [0,highestCount*1.1]}, {type: "text", variable: "independent", scalemode: "fit"}],
                  load: ReportGrid.query.data(data)
                      .limit(0,10),
                  options: {
                    label:{
                    },
                    height: 413,
                    width: 455,
                    horizontal: true,
                    effect: "none",
                    symbol: "image, 19x51:http://www.precog.com/external/external-images/graphic-single-oscar.png",
                    replace: false
                  }
                });
              }
            },
            
            function(ready) {
        
            var whiteList = ["bradley cooper",
                "daniel day-lewis",
                "hugh jackman",
                "denzel washington",
                "joaquin phoenix",
                "jessica chastain",
                "jennifer lawrence",
                "emmanuelle riva",
                "quvenzhanŽ wallis",
                "naomi watts",
                "alan arkin",
                "robert de niro",
                "philip seymour hoffman",
                "tommy lee jones",
                "christoph waltz",
                "amy adams",
                "sally field",
                "anne hathaway",
                "helen hunt",
                "jacki weaver"],
            
            
                regexlist = whiteList.map(function(s){
                  return new RegExp("\\b" + s + "\\b", "");
                }),
                maxSize = 0,
                minSize = Math.POSITIVE_INFINITY;
              ReportGrid.query.precog("tweets := //oscarGeo3/*/tweets tweets.text where tweets.sentiment =\"positive\"")
                .transform(function(data) {
                  var results = [];
                  for(var j = 0; j < data.length; j++) {
                    var s = data[j].toLowerCase();
                    for(var i = 0; i < whiteList.length; i++) {
                      //if(s.indexOf(whiteList[i]) >= 0)
                        if(regexlist[i].test(s)) 
                          results.push(whiteList[i]);
                    }
                  }
                  return results;
                })
                /*
                .transform(function(data) {
                  var pattern = /(^[^a-z0-9#@]|[^a-z0-9#@]$|'s$)/ig;
                  return data.join(" ").replace(/\s+/g, " ").split(" ").map(function(value){ return value.replace(pattern, "").toLowerCase(); });
                })
                .filter(function(value) {
                  if (value === "watch") {
                    console.log(whiteListmap);
                    console.log(value, !!whiteListmap[value]);
                  }
                  return whiteListmap.hasOwnProperty(value) && !!whiteListmap[value];
                })
            */
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
                //  renderWordCloud(words);
                  
                  
                }
              );
              function renderLeaderBoard(data){
                ReportGrid.leaderBoard("#oscars-actors", {
                  axes: ["text", "size"],
                  load: ReportGrid.query.data(data)
                      .limit(0,10),
                  options: {
                    label:{
                    },
                  }
                });
              }
            },
            
            function(ready){
        
            ReportGrid.geo("#oscars-geochart", {
              axes : ["id","count"],
              load : ReportGrid.query.request("http://nebula.precog.com/analytics/v1/fs/0000000069?apiKey=DB9A9D36-250D-4E82-84FD-11BF3C3EECED&q=tweets%20%3A%3D%20%2F%2FoscarGeo3%2F02-19%2Ftweets%20solve%20'name%2C%20'id%20tweets'%20%3A%3D%20tweets%20where%20tweets.state.id%20%3D%20'id%20%26%20tweets.state.name%20%3D%20'name%20%7B%20id%3A%20'id%2C%20name%3A%20'name%2C%20count%3A%20count(tweets'.state.name)%20%7D"),
              options : {
                "width": 455,
                "height": 360,
                "map": {
                  "template": "usa-states",
                  "mode": "orthographic",
                  "color": "css",
                  "property": "id",
                  "label": {
                  "datapointover": "@name Has @count Tweets"
                },
                scale: 475
                }
              }
            });
          
            },
            
            function(ready) {
          
              ReportGrid.lineChart("#oscars-linechart", {
                axes : ["hour",{"type":"sentiment","variable":"dependent"}],
                load : ReportGrid.query.request("http://nebula.precog.com/analytics/v1/fs/0000000069?apiKey=DB9A9D36-250D-4E82-84FD-11BF3C3EECED&q=tweets%20%3A%3D%20%2F%2FoscarGeo3%2F02-19%2Ftweets%20tweets'%20%3A%3D%20tweets%20with%20%7Bhour%20%3A%20std%3A%3Atime%3A%3AhourOfDay(tweets.timestamp)%7D%20solve%20'hour%20%7B%20hour%3A%20'hour%2C%20sentiment%3A%20mean(tweets'.score%20where%20tweets'.hour%20%3D%20'hour)%20%7D").sortValue("hour"),
                options : {
                  "width": 455,
                  "height": 360,
                  "label": {
                    "axis": "@humanize(type)",
                    "datapointover": "Average Sentiment: @sentiment"
                  },
                  "padding": {
                    "top": 20
                  },
                  "displayarea": true
                }
              });
          
            }
          ]
                while(charts.length > 0) {
          try{
              charts.shift()(function(){});
          } catch(e){
              console.log(e);
          };
        };
    });   
    }
});
