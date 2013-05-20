(function() {
	var app = angular.module("myApp", ["google-maps"]);

	app.config(function ($locationProvider) {
		$locationProvider.html5Mode(false).hashPrefix('!');
	});

	var api = new Precog.api({"apiKey": "10FE4058-2F45-4F46-925D-729FA545FA6B", "analyticsService" : "https://nebula.precog.com"});

	function renderCircles(data , map){	
		var circles = [];
		var color;
	//	console.log(data.val);
	//	var max_of_array = Math.max.apply(Math, data.val);
	//	console.log(max_of_array);

		for (i = 0; i < data.length ; i++) {

			if(data[i].day === 2){
				color = '#333333';
			}  else if(data[i].day === 1){
				color = '#6dc066'; 
			}
				else if(data[i].type === "Company"){
				 color = '#3ca9d0'
				}

			else color = '#FF0000';
			
			var circleOptions = {
			  strokeColor: color,
			  strokeOpacity: 0.5,
			  strokeWeight: 2,
			  fillColor: color,
			  fillOpacity: 0.2,
			  map: map,
			  center: new google.maps.LatLng(data[i].lat,data[i].lng),
			  radius: data[i].val
			};
			circles[i] = new google.maps.Circle(circleOptions);
		}

		for (k =0; k < circles.length; k++){
			(function(circle){
				google.maps.event.addListener(circle, 'click', function() {
					console.log("clicked on circle");
					if($scope.zoom <= 16){
						var zoomLevel = $scope.zoom + 1; 
					} else var zoomLevel = $scope.zoom;
				    
				    map.setZoom(zoomLevel);
	    			map.setCenter(circle.getPosition());
    			})(circles[k]);
			});
		}
	}

	function renderHeatMap(data, map){
		var points = [];

		for (i = 0; i < data.length; i++){
			points[i].location = new google.maps.Latlng(data.lat, data.lng);
		}

		var heatmap = new google.maps.visualization.HeatmapLayer({
			data : points
		});

		heatmap.setMap(map);

	}

	function renderMarkers(data, map, $scope){

  		console.log(data);
		var markers = [],
			i = 0;

		for (var marker in data){
			markers[i] = new google.maps.Marker({
				position : new google.maps.LatLng(data[marker].lat,data[marker].lng),
				map: map,
				title : data[marker].name
				});
			i++;
		}

		for (i=0; i < markers.length; i++){
			(function(marker){
				google.maps.event.addListener(marker, 'click', function() {
					if($scope.zoom <= 16){
						var zoomLevel = $scope.zoom + 1; 
					} else var zoomLevel = $scope.zoom;
				    map.setZoom(zoomLevel);
	    			map.setCenter(marker.getPosition());
	    			console.log(marker);
					});
			})(markers[i]);
		}
		return $scope.markers = markers;
	}

	function renderPaths(data, map){
		
		var data = data.data,
  			paths = [];
  			console.log(data);

  		for (i = 0; i < data.length ; i++){

			var path = [
		    new google.maps.LatLng(data[i].tailLat, data[i].tailLng),
		    new google.maps.LatLng(data[i].headLat, data[i].headLng),
		  	];
		  
		  	paths[i] = new google.maps.Polyline({
			    path: path,
			    strokeColor: "#FF0000",
			    strokeOpacity: 1.0,
			    strokeWeight: 2
		  	});

		  	paths[i].setMap(map);
	  	}
	}

	function clearOverlays(markersArray) {
	  if (markersArray) {
	  	markersArray.map(function(marker){
	  		marker.setMap(null);
	  	});
	  }
	}

	function deleteOverlays(markersArray) {
	  clearOverlays(markersArray);

	  if (markersArray) {
	  	markersArray.length = 0;
	  }
	}

	  //OVERLAY FUNCTION
	function createOverlay() {
	$("body").prepend("<div id='overlay'></div>");
	$("#overlay").on("click", function(){
	  $(this).remove();

	  $("#interactive-chart").animate({
	    opacity: 0.0,
	    zIndex: 0
	  }, 200);
	});

	    function positionChart(){
	      var hChartPosition = (($(window).width()) -600) / 2;
	      var vChartPosition = (($(window).height()) -400) / 2;

	      $("#interactive-chart").css({
	        left: hChartPosition,
	        top: vChartPosition,
	        zIndex: 1100
	      });
	    }

	    $(window).resize(function(){
	      positionChart();
	    });

	    positionChart();

	    $("#interactive-chart").animate({
	      opacity: 1.0
	    }, 500);
	  }

	function createMapOverlay(bounds, srcImage, map){

		function CustomOverlay(bounds, image, map){
		  this.bounds_ = bounds;
		  this.image_ = image;
		  this.map_ = map;
		  this.div_ = null;
		  this.setMap(map);
		}

		CustomOverlay.prototype = new google.maps.OverlayView();

		CustomOverlay.prototype.onAdd = function(){
			var div = document.createElement('div');
			div.style.border = "none";
			div.style.borderWidth = "0px";
			div.style.position = "absolute";

			var img = document.createElement("img");
			img.src = this.image_;
			img.style.width = "100%";
			img.style.height = "100%";
			div.appendChild(img);

			this.div_ = div;

			var panes = this.getPanes();
			panes.overlayMouseTarget.appendChild(div);
			google.maps.event.addDomListener( div, 'click', function(){
		      //	specify actual behavior here
		        alert("Clicked");
		    } );
		}

		CustomOverlay.prototype.draw = function() {

			var overlayProjection = this.getProjection();

			var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
			var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

			var div = this.div_;
			div.style.left = sw.x + 'px';
			div.style.top = ne.y + 'px';
			div.style.width = (ne.x - sw.x) + 'px';
			div.style.height = (sw.y - ne.y) + 'px';
		}

		var overlay = new CustomOverlay(bounds, srcImage, map);
		return overlay;
	}

	app.controller('MapController_AppLocation', function MapController ($scope) {

		$scope.$watch(function(){
			return $scope.storeName;
		}, (function(){
			var timer;
			return function(){
				clearTimeout(timer);
				timer = setTimeout(function(){
					$scope.render($scope.storeName, $scope.map.instance, $scope);
				}, 1000);

			};
		})());

		$scope.storeName = "Verizon";

/*		api.execute({query : "road := //0000000097/road  rand := observe(road, std::random::uniform(41))  road' := road where rand > 0.999 {lat : road'.prevLat, lng: road'.prevLong, day: road'.dayPart, val: 25}", limit : 1000}, 
			function(data){
				$scope.points = data.data;
				renderCircles($scope.points , $scope.map.instance);
		});


*/
		setTimeout(function(){

				var swBound = new google.maps.LatLng(41.45, -88.1);
				var neBound = new google.maps.LatLng(42.15, -87.35);
				var bounds = new google.maps.LatLngBounds(swBound, neBound);
				var srcImage = ""// "./sample.png"
			//	var overlay = new createMapOverlay(bounds, srcImage, $scope.map.instance);
				
			//	$scope.view = google.maps.MapTypeId.TERRAIN;
			//	console.log($scope.map.instance.mapTypeId);
			//	$scope.map.instance.mapTypeId = $scope.view;

				$scope.styles = [ { "featureType": "administrative", "stylers": [ { "visibility": "off" } ] },{ "featureType": "poi", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.local", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.arterial", "stylers": [ { "hue": "#ff0900" }, { "lightness": 49 } ] },{ "featureType": "road.highway", "stylers": [ { "hue": "#ff0900" }, { "lightness": 48 } ] },{ "featureType": "transit", "stylers": [ { "visibility": "off" } ] },{ "featureType": "water", "stylers": [ { "hue": "#0091ff" }, { "lightness": 49 } ] },{ } ];
				$scope.styledMap = new google.maps.StyledMapType($scope.styles, {name: "Styled Map"});
				$scope.map.instance.mapTypes.set('map_style', $scope.styledMap);
		  		$scope.map.instance.setMapTypeId('map_style');

		  		$scope.render($scope.storeName, $scope.map.instance, $scope);
			}, 2000);
			
			$scope.center = {
			lat: 41.85, // initial map center latitude
			lng: -87.65 // initial map center longitude
			};
			$scope.latitude = null;
			$scope.longitude = null;
			$scope.zoom = 9;
			$scope.markers = [];
			$scope.markerLat = null;
			$scope.markerLng = null;

			console.log($scope.map);

		$scope.render = function(storeName, map, $scope){
			if ($scope.markers){
				console.log($scope.markers);
			//deleteOverlays($scope.markers);
			}	
			//api.execute({query : "poi := //0000000097/poi poi' := poi where poi.name =  \"" + storeName + "\" poi' with {lng : poi'.long}", limit : 2000 },
			api.execute({query : "poiInfo := //0000000097/poiInfo poiInfo' := poiInfo where poiInfo.POI_NM =  \"" + storeName + "\" {name : poiInfo'.POI_NM, lat : poiInfo'.LATITUDE, lng : poiInfo'.LONGITUDE }", limit : 2000 },
			 	function(data) { 
				  	var data = data.data;
				  	renderMarkers(data, map, $scope);
				}
			);

		/*	api.execute({query : "import std::string::* allTweets := //0000000097/datasift tweets := allTweets where allTweets.salience.content.entities[0].name = \"" + storeName + "\" lat := tweets.interaction.geo.latitude lng := tweets.interaction.geo.longitude ts1 := dropLeft(tweets.interaction.created_at, 5) ts2 := dropRight(ts1, 6) timestamp := std::time::parseDateTime(ts2, \"dd MMM yyyy HH:mm:ss\") { lat : lat, lng : lng, timestamp : timestamp, name : tweets.salience.content.entities[0].name, gender : tweets.demographic.gender, language : tweets.language.tag, sentiment : tweets.salience.content.entities[0].sentiment, text : tweets.twitter.text, val : ((tweets.salience.content.entities[0].sentiment)^2 * 5) }"}, 
				function(data){
					var data = data.data;
					renderCircles(data, map);
				});
			api.execute({query : "poi := //0000000097/poi poi' := poi where poi.name = \"" + storeName + "\" r := solve 'location poi'' := poi' where poi'.locationId = 'location { locationId : 'location, val : std::math::floor(count(poi''.locationId)/10), lng : mean(poi''.long), lat : mean(poi''.lat) } distinct(r)"}, 
				function(data){
					var data = data.data;
					console.log(data);
					renderCircles(data, map);
				}
			);
		*/
			api.execute({query : "poi := //0000000097/poi poi' := poi where poi.name = \"" + storeName + "\"  {lng : poi'.long, lat : poi'.lat}"}, 
				function(data){
					var data = data.data;
					console.log(data);
					renderHeatMap(data, map);
				}
			);
		}
	});



	app.controller('MapController_Paths', function MapController ($scope, $http) {

			
		api.execute({query : "road := //0000000097/sampled/roadseg  rand := observe(road, std::random::uniform(41))  road' := road where rand > 0.999 {lat : road'.PREV_GEO_CD_LAT, lng: road'.PREV_GEO_CD_LONG, day: road'.DAY_PART, val: 1250}"}, 
			function(data){
				$scope.points = data.data;
				renderCircles($scope.points , $scope.map.instance);
		});
		
		$http.get('./js/markers.json').success(function(data) { 
			  //	var data = data.data; //when changed to api call, need to change
			  	renderMarkers(data, $scope.map.instance);
		});

		api.execute({query : "road := //0000000097/sampled/roadseg import std::math::* haversine(lat1, lng1, lat2, lng2) := lat1 := toRadians(lat1) lat2 := toRadians(lat2) lng1 := toRadians(lng1) lng2 := toRadians(lng2) 6378.1 *2 * asin(sqrt(((sin((lat2 - lat1)/2))^2 + cos(lat1)*cos(lat2) * (sin((lng2 - lng1)/2))^2))) road' := road with {distance :haversine(road.PREV_GEO_CD_LAT, road.PREV_GEO_CD_LONG, road.NEXT_GEO_CD_LAT, road.NEXT_GEO_CD_LONG)} {tailLat : road'.PREV_GEO_CD_LAT, tailLng : road'.PREV_GEO_CD_LONG, headLat : road'.NEXT_GEO_CD_LAT, headLng: road'.NEXT_GEO_CD_LONG, distance : road'.distance }", limit : 1000},
		  	function(data) { 
		  	renderPaths(data, $scope.map.instance);
		});


		$scope.center = {
			lat: 41.85, // initial map center latitude
			lng: -87.65 // initial map center longitude
		};

		setTimeout(function(){

			var swBound = new google.maps.LatLng(41.45, -88.1);
			var neBound = new google.maps.LatLng(42.15, -87.35);
			var bounds = new google.maps.LatLngBounds(swBound, neBound);
			var srcImage = ""// "./sample.png"
			var overlay = new createMapOverlay(bounds, srcImage, $scope.map.instance);
			
			$scope.view = google.maps.MapTypeId.TERRAIN;
			console.log($scope.map.instance.mapTypeId);
			$scope.map.instance.mapTypeId = $scope.view;

			$scope.styles = [ { "featureType": "administrative", "stylers": [ { "visibility": "off" } ] },{ "featureType": "poi", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.local", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.arterial", "stylers": [ { "hue": "#ff0900" }, { "lightness": 49 } ] },{ "featureType": "road.highway", "stylers": [ { "hue": "#ff0900" }, { "lightness": 48 } ] },{ "featureType": "transit", "stylers": [ { "visibility": "off" } ] },{ "featureType": "water", "stylers": [ { "hue": "#0091ff" }, { "lightness": 49 } ] },{ } ];
			$scope.styledMap = new google.maps.StyledMapType($scope.styles, {name: "Styled Map"});
			$scope.map.instance.mapTypes.set('map_style', $scope.styledMap);
	  		$scope.map.instance.setMapTypeId('map_style');

		}, 2000);	

		$scope.latitude = null;
		$scope.longitude = null;
		
		$scope.zoom = 9;
		
		$scope.markers = [];
		
		$scope.markerLat = null;
		$scope.markerLng = null;

		console.log($scope.map);
	});
	
	app.controller('MapController_Demographics', function MapController ($scope, $http) {

		$scope.iOS = true;
		$scope.android = true;

		if ( $scope.iOS && $scope.android ){
			$scope.operatingSystem = "\"iOS\"" + " & \"Android OS\"";
		} else if ( $scope.iOS && !$scope.android  ) {
			$scope.operatingSystem = "\"iOS\"" ;
		} else $scope.operatingSystem = "\"Android OS\"";
		console.log($scope.operatingSystem);

		$scope.chrome = true;
		$scope.firefox = true;
		$scope.ie = false;

		if ( $scope.chrome && $scope.firefox && $scope.ie ){
			$scope.browser = "\"Chrome\"" + " & \"Firefox\"" + " & \"IE\"";
		} else if ( $scope.chrome && $scope.firefox && !$scope.ie ) {
			$scope.browser = "\"Chrome\"" + " & \"Firefox\"";
		} else if ( $scope.chrome && !$scope.firefox && $scope.ie ) {
			$scope.browser = "\"Chrome\"" + " & \"IE\"";
		} else if ( !$scope.chrome && $scope.firefox && $scope.ie ) {
			$scope.browser = "\"Firefox\"" + " & \"IE\"";
		} else if ( $scope.ie ) {
			$scope.browser = "\"IE\"";
		} else if ( $scope.firefox ) {
			$scope.browser = "\"Firefox\"";
		} else $scope.browser = "\"Chrome\"";

		console.log($scope.browser);

		
		api.execute({query : "road := //0000000097/sampled/roadseg  rand := observe(road, std::random::uniform(41))  road' := road where rand > 0.999 {lat : road'.PREV_GEO_CD_LAT, lng: road'.PREV_GEO_CD_LONG, day: road'.DAY_PART, val: 1250}"},
		 function(data){
			$scope.points = data.data;
			renderCircles($scope.points , $scope.map.instance);
		});
		
		$http.get('./js/markers.json').success(function(data){
			renderMarkers(data, $scope.map.instance);
		});

		$scope.center = {
			lat: 41.85, // initial map center latitude
			lng: -87.65 // initial map center longitude
		};

		setTimeout(function(){

			var swBound = new google.maps.LatLng(41.45, -88.1);
			var neBound = new google.maps.LatLng(42.15, -87.35);
			var bounds = new google.maps.LatLngBounds(swBound, neBound);
			var srcImage = ""// "./sample.png"
			var overlay = new createMapOverlay(bounds, srcImage, $scope.map.instance);
			
			$scope.view = google.maps.MapTypeId.TERRAIN;
			console.log($scope.map.instance.mapTypeId);
			$scope.map.instance.mapTypeId = $scope.view;

			$scope.styles = [ { "featureType": "administrative", "stylers": [ { "visibility": "off" } ] },{ "featureType": "poi", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.local", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.arterial", "stylers": [ { "hue": "#ff0900" }, { "lightness": 49 } ] },{ "featureType": "road.highway", "stylers": [ { "hue": "#ff0900" }, { "lightness": 48 } ] },{ "featureType": "transit", "stylers": [ { "visibility": "off" } ] },{ "featureType": "water", "stylers": [ { "hue": "#0091ff" }, { "lightness": 49 } ] },{ } ];
			$scope.styledMap = new google.maps.StyledMapType($scope.styles, {name: "Styled Map"});
			$scope.map.instance.mapTypes.set('map_style', $scope.styledMap);
	  		$scope.map.instance.setMapTypeId('map_style');

		}, 2000);	

		$scope.latitude = null;
		$scope.longitude = null;
		
		$scope.zoom = 9;
		
		$scope.markers = [];
		
		$scope.markerLat = null;
		$scope.markerLng = null;

		console.log($scope.map);
	});

	app.controller('ChartRenderingController_Geo', function ($scope){

		$scope.test = function(){
			console.log("log test");
		}
		
		function renderBarChart(data, div){
			ReportGrid.barChart(div, {
			axes : ["x", "y"],
			data : data, 
			options : {
				"height" : 275,
				"width" : 300
			},
			ready : function(){
				createOverlay();
			}
		});
		}

		var data = [
			{"x" : 1, "y" :6 },
			{"x" : 2, "y" :7 },
			{"x" : 3, "y" :13 },
			{"x" : 4, "y" :1 },
			{"x" : 5, "y" :4 }
		]

		renderBarChart(data, "#interactive-chart");
		//renderBarChart(data, "#chart2");
	});


	app.controller('ChartRenderingController_Flow', function ($scope){

		$scope.$watch(function(){
			return $scope.siteName + " " + $scope.filter;
		}, (function(){
			var timer;
			return function(){
				clearTimeout(timer);
				timer = setTimeout(function(){
					$scope.render($scope.siteName, $scope.filter);
				}, 500);

			};
		})());


		$scope.siteName = 'Twitter';
		$scope.filter = 50;
		
		$scope.render = function (siteName, filter){
			ReportGrid.tooltip && ReportGrid.tooltip.hide();
			angular.element("#chart").addClass("spinner");

			/*	var customFlow = "url := //sampled/url url' := url where url.URL_NM = \"" + siteName + "\" first := solve 'ref, 'url x := url' where url'.URL_REF_SITE_NM = 'ref & url'.URL_NM = 'url { tail : 'ref, head : 'url, count : count(x) } second := solve 'next, 'url x := url' where url'.URL_NEXT_SITE_NM = 'next & url'.URL_NM = 'url { tail : 'url, head : 'next, count : count(x) } first' := first with {rank : std::stats::denseRank(first.count)} first'' := first' where first'.rank > max(first'.rank) - " + filter +" second' := second with {rank : std::stats::denseRank(second.count)} second'' := second' where second'.rank > max(second'.rank) -" + filter +" first'' union second''"; //based on rank
		

			var customFlow = "url := //sampled/url url' := url where url.URL_NM = \"" + siteName + "\" first := solve 'ref, 'url x := url' where url'.URL_REF_SITE_NM = 'ref & url'.URL_NM = 'url { tail : 'ref, head : 'url, count : count(x) } second := solve 'next, 'url x := url' where url'.URL_NEXT_SITE_NM = 'next & url'.URL_NM = 'url { tail : 'url, head : 'next, count : count(x) } first' := first where first.count > " + filter + " second' := second where second.count > " + filter +" r := first' union second' filtered := {head : \"" + siteName + "\", tail : \"filtered\", count : sum(r.count where r.tail = \"" + siteName + "\") - sum(r.count where r.tail != \"" + siteName + "\") } r union new filtered";
			*/

			var customFlow = "url := //sampled/url url' := url where url.URL_NM = \"" + siteName + "\" first := solve 'ref, 'url x := url' where url'.URL_REF_SITE_NM = 'ref & url'.URL_NM = 'url { tail : 'ref, head : 'url, count : count(x) } second := solve 'next, 'url x := url' where url'.URL_NEXT_SITE_NM = 'next & url'.URL_NM = 'url { tail : 'url, head : 'next, count : count(x) } first' := first where first.count > " + filter + " second' := second where second.count > " + filter +" r := first' union second' r";

			ReportGrid.sankey("#chart", {
				axes : ["count"],
				load : ReportGrid.query.precog(customFlow),
				options : {
					"height" : 600,
					"width" : 950,
				    stackbackedges : false,
				    thinbackedges : true,
					filterpacing : 15,
					"click" : function(dp){
						console.log( "clicked");
						console.log(dp);
						$scope.siteName = dp.id;
						$scope.$apply();
					},
					"ready" : function(){
						angular.element("#chart").removeClass("spinner");
					}
				}
			});
		};
		
		$scope.render($scope.siteName, $scope.filter);
	});

	app.controller('ChartRenderingController_Overview', function ($scope){
		
		var devices = "apps := //sampled/app solve 'device { device : 'device, count : count(apps.DEVICE_OS_NM where apps.DEVICE_OS_NM = 'device) }",
			top10Downloads = "apps := //sampled/app apps' := apps where apps.DOWNLOAD_FLAG = 1 r := solve 'app { app : 'app, count : count(apps'.APP_NM where apps'.APP_NM = 'app) } r' := r with { rank : std::stats::denseRank(r.count) } r' where r'.rank > max(r'.rank) - 10",
			aveUsage = "import std::time::* apps := //sampled/app apps' := apps with {end : parseDateTime(apps.SESS_END_TS, \"MM-dd-yyyy HH:mm:ss\") } r := solve 'app x := apps' where apps'.APP_NM = 'app { app : 'app, aveSession : mean(secondsBetween(x.SESS_START_TS, x.end)), maxSession : max(secondsBetween(x.SESS_START_TS, x.end)), stdDev : stdDev(secondsBetween(x.SESS_START_TS, x.end)), totalTime : sum(secondsBetween(x.SESS_START_TS, x.end)), count : count(x) } r' := r where r.count > 5 r'' := r' with { rank : std::stats::rank(r'.aveSession) } r'' where r''.rank > max(r''.rank) - 10",
			usageScatter = "import std::time::* apps := //sampled/app apps' := apps with {end : parseDateTime(apps.SESS_END_TS, \"MM-dd-yyyy HH:mm:ss\") } r := solve 'app x := apps' where apps'.APP_NM = 'app { app : 'app, aveSession : mean(secondsBetween(x.SESS_START_TS, x.end)), total : std::math::log10(sum(secondsBetween(x.SESS_START_TS, x.end)) + 1), count : count(x) } r where r.count > 1";

		ReportGrid.pieChart("#chart", {
			axes : ["count"],
			load : ReportGrid.query.precog(devices),
			options : {
				"height" : 240,
				"width" : 240,
				"labelorientation" : "horizontal",
				"label" : {
					"datapoint" : "@device",
					"datapointover" : "@ReportGrid.format(count/stats.tot * 100, \"P\")"
				}
			}
		});

		ReportGrid.barChart("#chart2", {
			axes : ["app", "count"],
			load : ReportGrid.query.precog(top10Downloads),
			options : {
				"height" : 250,
				"width" : 460,
				"barpadding" : 8,
				"horizontal" : true
			}
		});

		ReportGrid.barChart("#chart3", {
			axes : ["app", "aveSession"],
			load : ReportGrid.query.precog(aveUsage),
			options : {
				"height" : 250,
				"width" : 460,
				"horizontal" : true,
				"barpadding" : 10,
				"label" : {
					"datapointover" : "max : @maxSession, stdDev : @ReportGrid.format(stdDev), total : @totalTime"
				}
			}
		});

		ReportGrid.scatterGraph("#chart4", {
			axes : ["count", "total"],
			load : ReportGrid.query.precog(usageScatter).sortValue("count"),
			options : {
				"height" : 520,
				"width" : 900,
				"symbol" :  function(dp, stats){
					return ReportGrid.symbol("circle" , dp.aveSession * 3)
				},
				"label" : {
					"datapointover" : "@app - uses : @count, average session: @ReportGrid.format(aveSession), total usage : @ReportGrid.format(total)",
					"axis" : function(axis){
						if(axis === "count"){
							return "Total Number of Times an App is Used"
						} else return "Total Session Time for an App (log scale)"
					}
				},
				"displaytickminor": false,
      			"displaytickmajor": false,
      			"displayanchorlinetick" : true,
				"displayticklabel" : function(axis){
			        if(axis === "count"){
			          return false;
			        }
			        else return false;
			    },
			    "padding" : {
			    	left : 80
			    }
			
			}
		});
	});	

})();