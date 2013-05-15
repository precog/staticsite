(function() {
	var app = angular.module("myApp", ["google-maps"]);

	app.config(function ($locationProvider) {
		$locationProvider.html5Mode(false).hashPrefix('!');
	});

	var api = new Precog.api({"apiKey": "10FE4058-2F45-4F46-925D-729FA545FA6B", "analyticsService" : "https://nebula.precog.com"});

	function renderCircles(data , map){
		console.log("data", data);
		
		var circles = [];
		var color;

			for (i = 0; i < data.length ; i++) {

				if(data[i].day === 2){
					color = '#333333';
				}  else if(data[i].day === 1){
					color = '#6dc066'; 
				}
				else color = '#FF0000';
				
				var circleOptions = {
				  strokeColor: color,
				  strokeOpacity: 0.8,
				  strokeWeight: 2,
				  fillColor: color,
				  fillOpacity: 0.35,
				  map: map,
				  center: new google.maps.LatLng(data[i].lat,data[i].lng),
				  radius: data[i].val
				};
				circles[i] = new google.maps.Circle(circleOptions);
			}

			for (j =0; j < circles.length; j++){
				return circles[j];
			}

			for (k =0; k < circles.length; k++){
				(function(circle){
					google.maps.event.addListener(circle, 'click', function() {
						console.log("clicked on circle");
						if($scope.zoom <= 16){
							var zoomLevel = $scope.zoom + 1; 
						} else var zoomLevel = $scope.zoom;
					    
					    $scope.map.instance.setZoom(zoomLevel);
		    			$scope.map.instance.setCenter(circle.getPosition());
	    			})(circles[k]);
				});
			}
		}

	app.controller('MapController_AppLocation', function MapController ($scope) {

		api.execute({query : "road := //0000000097/sampled/roadseg  rand := observe(road, std::random::uniform(41))  road' := road where rand > 0.999 {lat : road'.PREV_GEO_CD_LAT, lng: road'.PREV_GEO_CD_LONG, day: road'.DAY_PART, val: 1250}"}, 
			function(data){
	
			$scope.points = data.data;
			renderCircles($scope.points , $scope.map.instance);
			
/*
			console.log($scope.points);
			console.log($scope.points.length);
			var circles = [];
			var color;

			for (i = 0; i < $scope.points.length ; i++) {

				if($scope.points[i].day === 2){
					color = '#333333';
				}  else if($scope.points[i].day === 1){
					color = '#6dc066'; 
				}
				else color = '#FF0000';
				
				var circleOptions = {
				  strokeColor: color,
				  strokeOpacity: 0.8,
				  strokeWeight: 2,
				  fillColor: color,
				  fillOpacity: 0.35,
				  map: $scope.map.instance,
				  center: new google.maps.LatLng($scope.points[i].lat,$scope.points[i].lng),
				  radius: $scope.points[i].val
				};
				circles[i] = new google.maps.Circle(circleOptions);
			}

			for (j =0; j < circles.length; j++){
				return circles[j];
			}

			for (k =0; k < circles.length; k++){
				(function(circle){
					google.maps.event.addListener(circle, 'click', function() {
						console.log("clicked on circle");
						if($scope.zoom <= 16){
							var zoomLevel = $scope.zoom + 1; 
						} else var zoomLevel = $scope.zoom;
					    
					    $scope.map.instance.setZoom(zoomLevel);
		    			$scope.map.instance.setCenter(circle.getPosition());
	    			})(circles[k]);
				});
			}
*/
		});

		$scope.storeName = "Verizon";

		api.execute({query : "poi := //0000000097/sampled/poi poi where poi.POI_NM =  \"" + $scope.storeName + "\"" },
		  function(data) { 
		  	var data = data.data;
		  	console.log(data);
			var markers = [],
				i = 0;

			for (var marker in data){

				markers[i] = new google.maps.Marker({
				position : new google.maps.LatLng(data[marker].LATITUDE,data[marker].LONGITUDE),
				map: $scope.map.instance,
				title : data[marker].POI_NM
				});
				i++;
			}

			for (i=0; i < markers.length; i++){
				(function(marker){
					google.maps.event.addListener(marker, 'click', function() {
						if($scope.zoom <= 16){
							var zoomLevel = $scope.zoom + 1; 
						} else var zoomLevel = $scope.zoom;
					    $scope.map.instance.setZoom(zoomLevel);
		    			$scope.map.instance.setCenter(marker.getPosition());
		    			console.log(marker);
  					});
				})(markers[i]);
			}
		});

		$scope.center = {
			lat: 41.85, // initial map center latitude
			lng: -87.65 // initial map center longitude
		};


		var swBound = new google.maps.LatLng(41.45, -88.1);
		var neBound = new google.maps.LatLng(42.15, -87.35);
		var bounds = new google.maps.LatLngBounds(swBound, neBound);
		var srcImage = ""// "./sample.png"


		setTimeout(function(){


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

		var overlay = new CustomOverlay(bounds, srcImage, $scope.map.instance);

		$scope.view = google.maps.MapTypeId.TERRAIN;
		console.log($scope.map.instance.mapTypeId);
		$scope.map.instance.mapTypeId = $scope.view;

		$scope.styles = [ { "featureType": "administrative", "stylers": [ { "visibility": "off" } ] },{ "featureType": "poi", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.local", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.arterial", "stylers": [ { "hue": "#ff0900" }, { "lightness": 49 } ] },{ "featureType": "road.highway", "stylers": [ { "hue": "#ff0900" }, { "lightness": 48 } ] },{ "featureType": "transit", "stylers": [ { "visibility": "off" } ] },{ "featureType": "water", "stylers": [ { "hue": "#0091ff" }, { "lightness": 49 } ] },{ } ];
		$scope.styledMap = new google.maps.StyledMapType($scope.styles, {name: "Styled Map"});
		$scope.map.instance.mapTypes.set('map_style', $scope.styledMap);
  		$scope.map.instance.setMapTypeId('map_style');

		}, 2000);

		$scope.geolocationAvailable = navigator.geolocation ? true : false;		

		$scope.latitude = null;
		$scope.longitude = null;
		
		$scope.zoom = 9;
		
		$scope.markers = [];
		
		$scope.markerLat = null;
		$scope.markerLng = null;

		console.log($scope.map);
	});

	app.controller('MapController_Paths', function MapController ($scope, $http) {

			
		api.execute({query : "road := //0000000097/sampled/roadseg  rand := observe(road, std::random::uniform(41))  road' := road where rand > 0.999 {lat : road'.PREV_GEO_CD_LAT, lng: road'.PREV_GEO_CD_LONG, day: road'.DAY_PART, val: 1250}"}, function(data){

			$scope.points = data.data;
			console.log($scope.points);
			console.log($scope.points.length);
			var circles = [];
			var color;
			for (i = 0; i < $scope.points.length ; i++) {
	
				if($scope.points[i].day === 2){
					color = '#333333';
				}  else if($scope.points[i].day === 1){
					color = '#6dc066'; 
				}
				else color = '#FF0000';
		
				var circleOptions = {
				  strokeColor: color,
				  strokeOpacity: 0.8,
				  strokeWeight: 2,
				  fillColor: color,
				  fillOpacity: 0.35,
				  map: $scope.map.instance,
				  center: new google.maps.LatLng($scope.points[i].lat,$scope.points[i].lng),
				  radius: $scope.points[i].val
				};
				circles[i] = new google.maps.Circle(circleOptions);
			}

			for (j =0; j < circles.length; j++){
				return circles[j];
			}

			for (k =0; k < circles.length; k++){
				(function(circle){
					google.maps.event.addListener(circle, 'click', function() {
						console.log("clicked on circle");
						if($scope.zoom <= 16){
							var zoomLevel = $scope.zoom + 1; 
						} else var zoomLevel = $scope.zoom;
					    
					    $scope.map.instance.setZoom(zoomLevel);
		    			$scope.map.instance.setCenter(circle.getPosition());
	    			})(circles[k]);
				});
			}
		});
		
		$http.get('./js/markers.json').success(function(data){
			
			var markers = [],
				i = 0;

			for (var marker in data){

				markers[i] = new google.maps.Marker({
				position : new google.maps.LatLng(data[marker].lat,data[marker].lng),
				map: $scope.map.instance,
				title : data[marker].demographic
				});
				i++;
			}

			for (i=0; i < markers.length; i++){
				(function(marker){
					google.maps.event.addListener(marker, 'click', function() {
						if($scope.zoom <= 16){
							var zoomLevel = $scope.zoom + 1; 
						} else var zoomLevel = $scope.zoom;
					    $scope.map.instance.setZoom(zoomLevel);
		    			$scope.map.instance.setCenter(marker.getPosition());
		    			console.log(marker);
  					});
				})(markers[i]);
			}

		});

		api.execute({query : "road := //0000000097/sampled/roadseg import std::math::* haversine(lat1, lng1, lat2, lng2) := lat1 := toRadians(lat1) lat2 := toRadians(lat2) lng1 := toRadians(lng1) lng2 := toRadians(lng2) 6378.1 *2 * asin(sqrt(((sin((lat2 - lat1)/2))^2 + cos(lat1)*cos(lat2) * (sin((lng2 - lng1)/2))^2))) road' := road with {distance :haversine(road.PREV_GEO_CD_LAT, road.PREV_GEO_CD_LONG, road.NEXT_GEO_CD_LAT, road.NEXT_GEO_CD_LONG)} {tailLat : road'.PREV_GEO_CD_LAT, tailLng : road'.PREV_GEO_CD_LONG, headLat : road'.NEXT_GEO_CD_LAT, headLng: road'.NEXT_GEO_CD_LONG, distance : road'.distance }", limit : 1000},
		  	function(data) { 
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

				  	paths[i].setMap($scope.map.instance);
			  	}
		});


		$scope.center = {
			lat: 41.85, // initial map center latitude
			lng: -87.65 // initial map center longitude
		};


		var swBound = new google.maps.LatLng(41.5, -88.5);
		var neBound = new google.maps.LatLng(42.5, -87.5);
		var bounds = new google.maps.LatLngBounds(swBound, neBound);
		var srcImage = ""// "./sample.png"


		setTimeout(function(){

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

		var overlay = new CustomOverlay(bounds, srcImage, $scope.map.instance);

		$scope.view = google.maps.MapTypeId.TERRAIN;
		console.log($scope.map.instance.mapTypeId);
		$scope.map.instance.mapTypeId = $scope.view;

		$scope.styles = [ { "featureType": "administrative", "stylers": [ { "visibility": "off" } ] },{ "featureType": "poi", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.local", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.arterial", "stylers": [ { "hue": "#ff0900" }, { "lightness": 49 } ] },{ "featureType": "road.highway", "stylers": [ { "hue": "#ff0900" }, { "lightness": 48 } ] },{ "featureType": "transit", "stylers": [ { "visibility": "off" } ] },{ "featureType": "water", "stylers": [ { "hue": "#0091ff" }, { "lightness": 49 } ] },{ } ];
		$scope.styledMap = new google.maps.StyledMapType($scope.styles, {name: "Styled Map"});
		$scope.map.instance.mapTypes.set('map_style', $scope.styledMap);
  		$scope.map.instance.setMapTypeId('map_style');

		}, 2000);

		$scope.geolocationAvailable = navigator.geolocation ? true : false;		

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

		


		api.execute({query : "road := //0000000097/sampled/roadseg  rand := observe(road, std::random::uniform(41))  road' := road where rand > 0.999 {lat : road'.PREV_GEO_CD_LAT, lng: road'.PREV_GEO_CD_LONG, day: road'.DAY_PART, val: 1250}"}, function(data){

			$scope.points = data.data;
			console.log($scope.points);
			console.log($scope.points.length);
			var circles = [];
			var color;

			for (i = 0; i < $scope.points.length ; i++) {
	
				if($scope.points[i].day === 2){
					color = '#333333';
				}  else if($scope.points[i].day === 1){
					color = '#6dc066'; 
				}
				else color = '#FF0000';

				var circleOptions = {
				  strokeColor: color,
				  strokeOpacity: 0.8,
				  strokeWeight: 2,
				  fillColor: color,
				  fillOpacity: 0.35,
				  map: $scope.map.instance,
				  center: new google.maps.LatLng($scope.points[i].lat,$scope.points[i].lng),
				  radius: $scope.points[i].val
				};
				circles[i] = new google.maps.Circle(circleOptions);
			}

			for (j =0; j < circles.length; j++){
				return circles[j];
			}

			for (k =0; k < circles.length; k++){
				(function(circle){
					google.maps.event.addListener(circle, 'click', function() {
						console.log("clicked on circle");
						if($scope.zoom <= 16){
							var zoomLevel = $scope.zoom + 1; 
						} else var zoomLevel = $scope.zoom;
					    
					    $scope.map.instance.setZoom(zoomLevel);
		    			$scope.map.instance.setCenter(circle.getPosition());
	    			})(circles[k]);
				});
			}
		});
		
		$http.get('./js/markers.json').success(function(data){
			var markers = [],
				i = 0;

			for (var marker in data){

				markers[i] = new google.maps.Marker({
				position : new google.maps.LatLng(data[marker].lat,data[marker].lng),
				map: $scope.map.instance,
				title : data[marker].demographic
				});
				i++;
			}

			for (i=0; i < markers.length; i++){
				(function(marker){
					google.maps.event.addListener(marker, 'click', function() {
						if($scope.zoom <= 16){
							var zoomLevel = $scope.zoom + 1; 
						} else var zoomLevel = $scope.zoom;
					    $scope.map.instance.setZoom(zoomLevel);
		    			$scope.map.instance.setCenter(marker.getPosition());
		    			console.log(marker);
  					});
				})(markers[i]);
			}

		});

		$scope.center = {
			lat: 41.85, // initial map center latitude
			lng: -87.65 // initial map center longitude
		};


		var swBound = new google.maps.LatLng(41, -88);
		var neBound = new google.maps.LatLng(42, -87);
		var bounds = new google.maps.LatLngBounds(swBound, neBound);
		var srcImage = ""// "./sample.png"


		setTimeout(function(){

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
		      //	specify behavior here
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

		var overlay = new CustomOverlay(bounds, srcImage, $scope.map.instance);

		$scope.view = google.maps.MapTypeId.TERRAIN;
		console.log($scope.map.instance.mapTypeId);
		$scope.map.instance.mapTypeId = $scope.view;

		$scope.styles = [ { "featureType": "administrative", "stylers": [ { "visibility": "off" } ] },{ "featureType": "poi", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.local", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.arterial", "stylers": [ { "hue": "#ff0900" }, { "lightness": 49 } ] },{ "featureType": "road.highway", "stylers": [ { "hue": "#ff0900" }, { "lightness": 48 } ] },{ "featureType": "transit", "stylers": [ { "visibility": "off" } ] },{ "featureType": "water", "stylers": [ { "hue": "#0091ff" }, { "lightness": 49 } ] },{ } ];
		$scope.styledMap = new google.maps.StyledMapType($scope.styles, {name: "Styled Map"});
		$scope.map.instance.mapTypes.set('map_style', $scope.styledMap);
  		$scope.map.instance.setMapTypeId('map_style');

		}, 2000);

		$scope.geolocationAvailable = navigator.geolocation ? true : false;		

		$scope.latitude = null;
		$scope.longitude = null;
		
		$scope.zoom = 9;
		
		$scope.markers = [];
		
		$scope.markerLat = null;
		$scope.markerLng = null;

		console.log($scope.map);
	});

	app.controller('DataRenderingController', function DataRenderingController($scope, $http){
		
		$http.get('./js/data.json').success(function(data){
			$scope.points = data;
		});

	});

	app.controller('ChartRenderingController_Geo', function ($scope){
		
		function renderBarChart(data, div){
			ReportGrid.barChart(div, {
			axes : ["x", "y"],
			data : data, 
			options : {
				"height" : 275,
				"width" : 300
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

		renderBarChart(data, "#chart");
		renderBarChart(data, "#chart2");
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
					"height" : 800,
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
				"width" : 325,
				"barpadding" : 14,
				"horizontal" : true
			}
		});

		ReportGrid.barChart("#chart3", {
			axes : ["app", "aveSession"],
			load : ReportGrid.query.precog(aveUsage),
			options : {
				"height" : 250,
				"width" : 325,
				"horizontal" : true,
				"barpadding" : 14,
				"label" : {
					"datapointover" : "max : @maxSession, stdDev : @ReportGrid.format(stdDev), total : @totalTime"
				}
			}
		});

		ReportGrid.scatterGraph("#chart4", {
			axes : ["count", "total"],
			load : ReportGrid.query.precog(usageScatter).sortValue("count"),
			options : {
				"height" : 650,
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