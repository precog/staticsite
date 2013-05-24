(function() {
	var app = angular.module("myApp", ["google-maps"]);

	app.config(function ($locationProvider) {
		$locationProvider.html5Mode(false).hashPrefix('!');
	});

	var api = new Precog.api({"apiKey": "10FE4058-2F45-4F46-925D-729FA545FA6B", "analyticsService" : "https://nebula.precog.com"});

	var circles;
	function renderCircles(data , map){	
		if(circles){
			circles.map(function(circle){
				circle.setMap(null);
			});
		}

		circles = [];
		var color;
	//	var max_of_array = Math.max.apply(Math, data.val);

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
					if($scope.zoom <= 16){
						var zoomLevel = $scope.zoom + 1; 
					} else var zoomLevel = $scope.zoom;
				    
				    map.setZoom(zoomLevel);
	    			map.setCenter(circle.getPosition());
    			})(circles[k]);
			});
		}
	}

	var heatmap;

	function renderHeatMap(data, map){
		if(heatmap){
			heatmap.setMap(null);
		}
		var points = [];

		for (var i = 0; i < data.length; i++){
			points[i] = { 
				location : new google.maps.LatLng(data[i].lat, data[i].lng),
				weight : data[i].weight
			};
		}

		heatmap = new google.maps.visualization.HeatmapLayer({
			data : points,
			radius : 25
		});

		heatmap.setMap(map);

	}

	var markers;

	function renderMarkers(data, map, styling, labeling, clicking){
		styling = styling || function(){
			return {
			    path: google.maps.SymbolPath.CIRCLE,
			    scale: 4,
			    strokeWeight : 0,
			    fillColor : "#000",
			    fillOpacity : 1
			};
		};

		labeling = labeling || function(item){
			return item.name;
		};

		if(markers){
			markers.map(function(marker){
				marker.setMap(null);
			});
		}

		markers = [];

		for (var i = 0; i < data.length; i++){
			var item = data[i];
			markers.push(new google.maps.Marker({
				position : new google.maps.LatLng(item.lat,item.lng),
				map: map,
				title : labeling(item),
				icon : styling(item)
			}));
		}

		if(clicking) {
			for (var i = 0; i < markers.length; i++){
				(function(item, marker){
					google.maps.event.addListener(marker, 'click', function() {
						clicking(item, marker, map);
					});
/*
	if($scope.zoom <= 16){
		var zoomLevel = $scope.zoom + 1; 
	} else var zoomLevel = $scope.zoom;
    map.setZoom(zoomLevel);
	map.setCenter(marker.getPosition());
*/
				})(data[i], markers[i]);
			}
		}
	}

	function renderPaths(data, map){
		
		var data = data.data,
  			paths = [];

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

	function positionChart() {
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

	function styleMap($scope, handler){
		setTimeout(function(){

			var swBound = new google.maps.LatLng(41.45, -88.1);
			var neBound = new google.maps.LatLng(42.15, -87.35);
			var bounds = new google.maps.LatLngBounds(swBound, neBound);
			var srcImage = ""// "./sample.png"
		//	var overlay = new createMapOverlay(bounds, srcImage, $scope.map.instance);
			
		//	$scope.view = google.maps.MapTypeId.TERRAIN;
		//	$scope.map.instance.mapTypeId = $scope.view;

			var styles = [ { "featureType": "administrative.locality", "stylers": [ { "visibility": "simplified" } ] },{ "featureType": "landscape", "stylers": [ { "visibility": "off" } ] },{ "featureType": "poi", "stylers": [ { "visibility": "off" } ] },{ "featureType": "transit", "stylers": [ { "visibility": "off" } ] },{ "featureType": "water", "stylers": [ { "visibility": "simplified" } ] },{ "featureType": "road.local", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.arterial", "stylers": [ { "visibility": "simplified" }, { "hue": "#ff0000" }, { "saturation": -90 } ] },{ "featureType": "road.highway", "stylers": [ { "visibility": "simplified" }, { "hue": "#ff0900" }, { "saturation": -87 } ] },{ } ]; //[ { "featureType": "administrative", "stylers": [ { "visibility": "off" } ] },{ "featureType": "poi", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.local", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.arterial", "stylers": [ { "hue": "#ff0900" }, { "lightness": 49 } ] },{ "featureType": "road.highway", "stylers": [ { "hue": "#ff0900" }, { "lightness": 48 } ] },{ "featureType": "transit", "stylers": [ { "visibility": "off" } ] },{ "featureType": "water", "stylers": [ { "hue": "#0091ff" }, { "lightness": 49 } ] },{ } ];
			var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
			$scope.map.instance.mapTypes.set('map_style',styledMap);
	  		$scope.map.instance.setMapTypeId('map_style');

	  		if(handler){
	  			handler($scope.map.instance);
	  		}
//		  		$scope.render($scope.storeName, $scope.map.instance, $scope);
		}, 0);
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
		$scope.storeNames = ["7-Eleven","AMC Theatres","AT&T","Abercrombie & Fitch","Ace Hardware","Acura","Advance Auto Parts","Aloft","American Eagle Outfitters","Apple Store","Applebee's","Arby's","Audi","AutoZone","Avis","BMW","Babies\"R\"Us","Banana Republic","Bank Of America","Bath & Body Works","Bed Bath & Beyond","Bentley","Best Buy","Best Western","Big Lots","Bloomingdale's","Buick","Burger King","CVS/pharmacy","Cadillac","Caribou Coffee","Chase","Chevrolet","Chrysler","Chuck E. Cheese's","Cinemark","Circle K","Citibank","Coach","Comfort Inn","Comfort Suites","Costco Wholesale","Courtyard by Marriott","Days Inn","Dick's Sporting Goods","Dodge","Dollar Tree","Dunkin' Donuts","Exxon","Fairfield Inn & Suites by Marriott","Ferrari","Fiat","Ford","Four Points by Sheraton","GMC","GameStop","Gap","Gymboree","H&M","Hampton Inn","Hilton","Hilton Garden Inn","Holiday Inn","Holiday Inn Express","Honda","Hyundai","IMAX","Infiniti","J.Crew","JCPenney","JW Marriott","Jaguar","Jeep","Kerasotes ShowPlace Theaters","Kia","Kmart","Kohl's","Kroger","Lamborghini","Land Rover","Lexus","Lincoln","Lowe's","MINI","Macy's","Marcus Theaters","Marriott","Marriott SpringHill Suites","Marshalls","Maserati","Maybach","Mazda","McDonald's","Meijer","Mercedes-Benz","Mitsubishi","Mobil","Motel 6","Neiman Marcus","Nissan","Nordstrom","O'Reilly Auto Parts","Office Depot","OfficeMax","Old Navy","Olive Garden","PNC Bank","Panera Bread","PetSmart","Petco","Pizza Hut","Porsche","Quality Inn","RadioShack","Red Lobster","Regal Cinemas","Rolls-Royce","Saab","Sam's Club","Save-A-Lot","Sears","Sears Hometown Store","Shell","Sheraton","Sports Authority","Staples","Starbucks","Subaru","Subway","Super 8","Suzuki","T.G.I. FRIDAY's","T.J.Maxx","TARGET","Taco Bell","The Children's Place","The Home Depot","The UPS Store","Toyota","Toys\"R\"Us","Trader Joe's","Verizon","Victoria's Secret","Volkswagen","Volvo","Walgreens","Walmart","Wells Fargo","Wendy's","Westin","Whole Foods"];

/*		api.execute({query : "road := //0000000097/road  rand := observe(road, std::random::uniform(41))  road' := road where rand > 0.999 {lat : road'.prevLat, lng: road'.prevLong, day: road'.dayPart, val: 25}", limit : 1000}, 
			function(data){
				$scope.points = data.data;
				renderCircles($scope.points , $scope.map.instance);
		});


*/
		styleMap($scope);
			
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


		$scope.render = function(storeName, map, $scope){
			if ($scope.markers){
			//deleteOverlays($scope.markers);
			}	
			//api.execute({query : "poi := //0000000097/poi poi' := poi where poi.name =  \"" + storeName + "\" poi' with {lng : poi'.long}", limit : 2000 },
			api.execute({query : "poiInfo := //0000000097/poiInfo poiInfo' := poiInfo where poiInfo.POI_NM =  \"" + storeName + "\" {name : poiInfo'.POI_NM, lat : poiInfo'.LATITUDE, lng : poiInfo'.LONGITUDE }", limit : 2000 },
			 	function success(data) { 
				  	var data = data.data;
				  	renderMarkers(data, map);
				},
				function error(err) {
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
					renderCircles(data, map);
				}
			);
		*/
		//	api.execute({query : "import std::math::* poi := //0000000097/poi poi' := poi where poi.name = \"" + storeName + "\" ds :=  {lng : roundTo(poi'.long, 2), lat : roundTo(poi'.lat, 2)} solve 'lat, 'lng ds' := ds where ds.lat = 'lat & ds.lng = 'lng {lat : 'lat, lng: 'lng, weight : count(ds'.lat)}"}, 
			api.execute({query : "poi := //0000000097/poi poi' := poi where poi.name = \"" + storeName + "\"  {lng : poi'.long, lat : poi'.lat} ", limit : 1000}, 
				function success(data){
					var data = data.data;
					renderHeatMap(data, map);
				},
				function error(err) {
				}
			);
		}
	});



	app.controller('MapController_Recommendations', function MapController ($scope, $http) {
		$scope.center = {
			lat: 41.85, // initial map center latitude
			lng: -87.65 // initial map center longitude
		};
		$scope.ads = [];
		$scope.zoom = 9;
		$scope.traits = [ "$0 - $14,999", "$100,000 - $124,999", "$125,000+", "$15,000 - $19,999", "$20,000 - $29,999", "$30,000 - $39,999", "$40,000 - $49,999", "$50,000 - $74,999", "$75,000 - $99,999", "18 to 24", "25 to 34", "35 to 44", "45 to 54", "55 to 64", "65 to 74", "75+", "Acred Couples", "Android", "Apple", "Apple Pie Families", "Asian", "Beauty and Wellness", "Black", "Blackberry OS", "Career Building", "Career Centered Singles", "Cartoons and Carpools", "Children First", "Children Present", "City Mixers", "Clubs and Causes", "College", "Collegiate Crowd", "Community Singles", "Cooking", "Corporate Clout", "Country Comfort", "Country Single", "Country Ways", "Devoted Duos", "Downtown Dwellers", "Dynamic Duos", "Early Parents", "English", "Entertainment", "Established Elite", "Family Matters", "Farmland Families", "Feature Phone", "Female", "Finance", "First Digs", "First Mortgage", "Full Steaming", "Fun and Games", "Graduate School", "Hard Chargers", "High School", "Hispanic", "Home Cooking", "Home and Garden", "Humble Homes", "Kids and Clout", "Kids and Rent", "Lavish Lifestyles", "Male", "Married", "Married Sophisticates", "Metro Mix", "Metro Parents", "Mid Americana", "Midtown Minivanners", "Mobile Mixers", "Modest Wages", "No Children Present", "Non Smartphone", "Other", "Outward Bound", "Own", "Pennywise Mortgagees", "Pennywise Proprietors", "Pets and Animals", "Platinum Oldies", "Raisin GrandKids", "Rent", "Resilient Renters", "Resolute Renters", "Rolling Stones", "Rural Everlasting", "Rural Parents", "Rural Retirement", "Rural Rovers", "Savvy Singles", "Shooting Stars", "Single", "Sitting Pretty", "Skyboxes and Suburbans", "Smartphone", "Soccer and SUVs", "Society", "Solid Single Parents", "Solo and Stable", "Spanish", "Sports", "Spouses and Houses", "Still Truckin", "Suburban Seniors", "Summit Estates", "Technology", "The Great Outdoors", "Thrifty Elders", "Timeless Elders", "Tots and Toys", "Travel", "Truckin and Stylin", "Urban Scramble", "Urban Tenants", "Vocational/Technical", "White", "Windows", "Work and Causes", "Young Workboots", "webOS" ];

		var markers = [{"address":"810 W North Ave","lng":-87.648746,"id":10167,"lat":41.910975},{"address":"1245  Torrence Ave","lng":-87.558488,"id":998130073,"lat":41.600597},{"address":"13447  Cicero Ave","lng":-87.738108,"id":998133743,"lat":41.648113},{"address":"1652 N Milwaukee Ave","lng":-87.679068,"id":998135363,"lat":41.911535},{"address":"9635 N Milwaukee Ave","lng":-87.839031,"id":998265574,"lat":42.056298},{"address":"5  Woodfield Mall","lng":-88.038161,"id":998484506,"lat":42.049155},{"address":"36 S State St","lng":-87.627979,"id":1011463156,"lat":41.880853}];


		function filterTrait(item) {
			return item.name && item.traits.length;
		}

		function leaderboard() {
			if(!$scope.storeId) return;
			var ads = $scope.ads.filter(filterTrait);
			if(!ads.length) return;

			var traits = [];
			ads.map(function(ad) {
				ad.traits.map(function(trait) {
					traits.push({name : ad.name, trait : trait});
				});
			});
/*
			var query = "poi := //0000000097/poi poi' := poi where poi.locationId = "+$scope.storeId+" & std::time::date(poi.timestamp) = \"2013-04-13\" potentialCustomers := { id : poi'.subsId} demo := //0000000097/demographics demo ~ potentialCustomers traits := {data : demo, id : potentialCustomers} where demo.id = potentialCustomers.id ad := new flatten("+JSON.stringify(traits)+") matchesByUser := solve 'id, 'name user := traits where traits.data.id = 'id ad ~ user r := {matches : ad.trait, id: user.id.id, name : 'name, count: count(ad.name where ad.name = 'name)} where ad.trait = user.data.trait distinct(r) evaluateAds := solve 'name, 'user { adStrength : count(matchesByUser.id where matchesByUser.id = 'user & matchesByUser.name = 'name)/ (matchesByUser.count where matchesByUser.name = 'name), id : 'user, name : 'name } distinct(evaluateAds)";
*/
			var query = "ds := //0000000097/processed/traits/locId possibleMatches := count(ds.id) traits := ds where ds.locationId = "+$scope.storeId+" ad := new flatten("+JSON.stringify(traits)+") matchesByUser := solve 'id, 'name user := traits where traits.id = 'id ad ~ user r := {matches : ad.trait, id: user.id, name : 'name, count: count(ad.name where ad.name = 'name)} where ad.trait = user.trait distinct(r) counts := distinct({ name: matchesByUser.name, count: matchesByUser.count }) evaluateAds := solve 'user, 'name m' := matchesByUser where matchesByUser.id = 'user & matchesByUser.name = 'name c' := counts.count where counts.name = 'name total := count(m') / c' { adStrength: total, id: 'user, name: 'name } r := solve 'strength x := evaluateAds where evaluateAds.adStrength = 'strength { adStrength : 'strength, matches : count(x.adStrength) } r union new { matches : possibleMatches - sum(r.matches), adStrength : 0 }";

			console.log(query);

			api.execute({ query : query },
				function(data) {
					var ads = data.data;
					var top = ads.sort(function(a, b) {
						return b.adStrength - a.adStrength;
					}).slice(0, 20);
					$scope.topAds = top;
					$scope.$apply();
				}
			);
		}

		var timer;
		$scope.$watch(
			function() {
				return JSON.stringify($scope.ads.filter(filterTrait));
			},
			function() {
				clearTimeout(timer);
				timer = setTimeout(function() {
					leaderboard();
				}, 500);
			}
		);

		$scope.removeAd = function(ad) {
			var index = $scope.ads.indexOf(ad);
			if(index >= 0)
				$scope.ads.splice(index, 1);
		};

		$scope.addAd = function() {
			$scope.ads.push({ name : "", traits : [] });
		};

		$scope.addAd();
/*
			
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

*/
		styleMap($scope, function(map){

	  		renderMarkers(markers, map, null, 
	  			function(item) {
	  				return item.address;
	  			},
	  			function(item, marker, map) {
	  				var id = item.id;
		  			$scope.storeId = id;
		  			$scope.storeAddress = item.address;
		  			$scope.$apply();
	  				api.execute({
		  					query : "pos := //0000000097/pos pos' := pos where pos.\"POI ID\" = "+id+" & pos.INVC_DT = \"4/13/2013\" poi := //0000000097/poi poi' := poi where poi.locationId = "+id+" & std::time::date(poi.timestamp) = \"2013-04-13\" totalTraffic := count(poi'.locationId) conversions := count(pos' where pos'.ORDER_TYPE != \"RF\") totalSales := sum(pos'.\"Sum(ITEM_PRC_AMT)\" where pos'.ORDER_TYPE != \"RF\") averageSaleAmount := totalSales/conversions conversionRate := conversions / totalTraffic {conversionRate : conversionRate, transactions : conversions, totalSales : totalSales, averageSaleAmount : averageSaleAmount, totalTraffic : totalTraffic}"
		  				},
		  				function(data) {
		  					var info = data.data[0];
		  					if(!info) return;
		  					for(var key in info)
		  						$scope[key] = info[key];
		  					$scope.$apply();


		  					console.log(JSON.stringify(info));
		  				});

	  				leaderboard();
	  			}	
	  		);
		});
		

/*
"poi := //0000000097/poi poi' := poi where poi.locationId = "+id+" & std::time::date(poi.timestamp) = \"2013-04-13\" potentialCustomers := { id : poi'.subsId} demo := //0000000097/demographics demo ~ potentialCustomers traits := {data : demo, id : potentialCustomers} where demo.id = potentialCustomers.id ad := new flatten("+JSON.stringify(traits)+") matchesByUser := solve 'id, 'name user := traits where traits.data.id = 'id ad ~ user r := {matches : ad.trait, id: user.id, name : 'name, count: count(ad.name where ad.name = 'name)} where ad.trait = user.data.trait distinct(r) evaluateAds := solve 'name, 'user { adStrength : count(matchesByUser.id where matchesByUser.id = 'user & matchesByUser.name = 'name)/ (matchesByUser.count where matchesByUser.name = 'name), id : 'user, name : 'name } evaluateAds"
*/

	});

	
	app.controller('MapController_Demographics', function MapController ($scope, $http) {

/*
		$scope.iOS = true;
		$scope.android = true;

		if ( $scope.iOS && $scope.android ){
			$scope.operatingSystem = "\"iOS\"" + " & \"Android OS\"";
		} else if ( $scope.iOS && !$scope.android  ) {
			$scope.operatingSystem = "\"iOS\"" ;
		} else $scope.operatingSystem = "\"Android OS\"";

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

		
		api.execute({query : "road := //0000000097/sampled/roadseg  rand := observe(road, std::random::uniform(41))  road' := road where rand > 0.999 {lat : road'.PREV_GEO_CD_LAT, lng: road'.PREV_GEO_CD_LONG, day: road'.DAY_PART, val: 1250}"},
		 function(data){
			$scope.points = data.data;
			renderCircles($scope.points , $scope.map.instance);
		});
		
		$http.get('./js/markers.json').success(function(data){
			renderMarkers(data, $scope.map.instance);
		});

*/		$scope.$watch(function(){
			var traits = [$scope.age, $scope.education, $scope.ethnicity,  $scope.gender, $scope.income, $scope.interest];
			return JSON.stringify(traits);
		}, (function(){
			var timer;
			return function(){
				clearTimeout(timer);
				timer = setTimeout(function(){
					var traits = [$scope.age, $scope.education, $scope.ethnicity,  $scope.gender, $scope.income, $scope.interest].filter(function(t){ return !!t; });
					if(!traits.length){
						return;
					}
					$scope.render($scope.storeName, traits, $scope.map.instance);
				}, 3000);
			};
		})());

		setTimeout(function(){
			$scope.$watch("type", function(){
					$scope.renderStores($scope.storeName, $scope.type.id, $scope.map.instance);
			}, true);
			$scope.$apply();
		}, 1000)

		$scope.storeName = "Verizon";
		$scope.traits = [ "$0 - $14,999", "$100,000 - $124,999", "$125,000+", "$15,000 - $19,999", "$20,000 - $29,999", "$30,000 - $39,999", "$40,000 - $49,999", "$50,000 - $74,999", "$75,000 - $99,999", "18 to 24", "25 to 34", "35 to 44", "45 to 54", "55 to 64", "65 to 74", "75+", "Acred Couples", "Android", "Apple", "Apple Pie Families", "Asian", "Beauty and Wellness", "Black", "Blackberry OS", "Career Building", "Career Centered Singles", "Cartoons and Carpools", "Children First", "Children Present", "City Mixers", "Clubs and Causes", "College", "Collegiate Crowd", "Community Singles", "Cooking", "Corporate Clout", "Country Comfort", "Country Single", "Country Ways", "Devoted Duos", "Downtown Dwellers", "Dynamic Duos", "Early Parents", "English", "Entertainment", "Established Elite", "Family Matters", "Farmland Families", "Feature Phone", "Female", "Finance", "First Digs", "First Mortgage", "Full Steaming", "Fun and Games", "Graduate School", "Hard Chargers", "High School", "Hispanic", "Home Cooking", "Home and Garden", "Humble Homes", "Kids and Clout", "Kids and Rent", "Lavish Lifestyles", "Male", "Married", "Married Sophisticates", "Metro Mix", "Metro Parents", "Mid Americana", "Midtown Minivanners", "Mobile Mixers", "Modest Wages", "No Children Present", "Non Smartphone", "Other", "Outward Bound", "Own", "Pennywise Mortgagees", "Pennywise Proprietors", "Pets and Animals", "Platinum Oldies", "Raisin GrandKids", "Rent", "Resilient Renters", "Resolute Renters", "Rolling Stones", "Rural Everlasting", "Rural Parents", "Rural Retirement", "Rural Rovers", "Savvy Singles", "Shooting Stars", "Single", "Sitting Pretty", "Skyboxes and Suburbans", "Smartphone", "Soccer and SUVs", "Society", "Solid Single Parents", "Solo and Stable", "Spanish", "Sports", "Spouses and Houses", "Still Truckin", "Suburban Seniors", "Summit Estates", "Technology", "The Great Outdoors", "Thrifty Elders", "Timeless Elders", "Tots and Toys", "Travel", "Truckin and Stylin", "Urban Scramble", "Urban Tenants", "Vocational/Technical", "White", "Windows", "Work and Causes", "Young Workboots", "webOS" ];
		$scope.types = [{id :"PS", label : "Equipment & Service"}, {id : "IS", label : "Accessory sale" }, { id : "RF", label : "Refund" }];
		$scope.type = $scope.types[0];
//		$scope.subcategories = ["Age Range", "Education", "Ethnicity", "Gender", "Household Income", "Interests" ];
	
/*
		api.execute({query : "demo := //0000000097/demographics distinct(demo.trait where demo.subcategory = \"" + $scope.subcategories[0] + "\")"},
			function(data) { 
				$scope.age = data.data;
			}
		 );

*/
		$scope.ages 	   = ["18 to 24",  "25 to 34",  "35 to 44",  "45 to 54",  "55 to 64",  "65 to 74",  "75+"];
		$scope.educations  = ["College","Graduate School","High School","Vocational/Technical"];
		$scope.ethnicities = ["Asian","Black","Hispanic","Other","White"];
		$scope.genders 	   = ["Male", "Female"];
		$scope.incomes 	   = [ "$0 - $14,999", "$100,000 - $124,999", "$125,000+", "$15,000 - $19,999", "$20,000 - $29,999", "$30,000 - $39,999", "$40,000 - $49,999", "$50,000 - $74,999", "$75,000 - $99,999"];
		$scope.interests   = [ "Beauty and Wellness", "Cooking", "Entertainment", "Finance", "Home and Garden", "Pets and Animals", "Society", "Sports", "Technology", "Travel"];
 

		$scope.renderStores = function(name, type, gmap){
			var query;
			if(type){
				 query = "sales := //0000000097/pos sales' := sales where sales.INVC_DT = \"4/13/2013\" & sales.ORDER_TYPE = \""+ type + "\" salesByType := solve 'id sales'' := sales' where sales'.\"POI ID\" = 'id { amount : sum(sales''.\"Sum(ITEM_PRC_AMT)\"), transactions : count(sales''.\"Sum(ITEM_PRC_AMT)\"), locationId : 'id } info := //0000000097/poiInfo info' := info where info.POI_GRP_NM = \"" +name + "\" salesByType ~ info' {amount : salesByType.amount, transactions : salesByType.transactions, id : salesByType.locationId, lat : info'.LATITUDE, lng : info'.LONGITUDE, name : info'.POI_NM } where salesByType.locationId = info'.POI_ID";
			} else {
				query = "sales := //0000000097/pos sales' := sales where sales.INVC_DT = \"4/13/2013\" salesByType := solve 'id sales'' := sales' where sales'.\"POI ID\" = 'id { amount : sum(sales''.\"Sum(ITEM_PRC_AMT)\"), transactions : count(sales''.\"Sum(ITEM_PRC_AMT)\"), locationId : 'id } info := //0000000097/poiInfo info' := info where info.POI_GRP_NM = \"" +name + "\" salesByType ~ info' {amount : salesByType.amount, transactions : salesByType.transactions, id : salesByType.locationId, lat : info'.LATITUDE, lng : info'.LONGITUDE, name : info'.POI_NM } where salesByType.locationId = info'.POI_ID";
			}
			api.execute({query: query},
  				function(data) { 
  					renderMarkers(data.data, gmap, function(item){
						return {
						    path: google.maps.SymbolPath.CIRCLE,
						    scale: item.transactions,
						    strokeWeight : 2,
						    strokeOpacity : 0.4
						};
					}, function(item){
						return "Amount: $" + item.amount + ", Transactions: " + item.transactions;
					});	
  				}
  			);
			
		}

		$scope.render = function(name, traits, gmap){

			var where = traits.map(function(trait) { return 'demo.trait = "'+trait.replace(/["]/g, '\\"')+'"'; }).join(' | ');

			api.execute({query : "poi := //0000000097/poi poi' := poi where poi.name = \"" + name + "\" & std::time::date(poi.timestamp) = \"2013-04-13\" demo := //0000000097/demographics demo' := demo where " + where + " poi' ~ demo' joined := {poi : poi', demo : demo'} where demo'.id = poi'.subsId byTrait := solve 'id, 'trait joined' := joined where joined.poi.locationId = 'id & joined.demo.trait = 'trait { locationId : 'id, trait : 'trait, count : count(joined'.demo.trait), id :joined.poi.subsId } r := solve 'id, 'location results' := distinct(byTrait where byTrait.id = 'id & byTrait.locationId = 'location) { id : 'id, traitOccurences : count(results'.trait), data : results' } r where r.traitOccurences = "+ traits.length},
				function(data) { 
					var data = data.data;

					api.execute({ query : "poiInfo := //0000000097/poiInfo poiInfo' := poiInfo where poiInfo.POI_GRP_NM = \"" + name + "\" {lat : poiInfo'.LATITUDE, lng : poiInfo'.LONGITUDE, locationId : poiInfo'.POI_ID}" },
  						function(locations){
  							var map = {};
  							locations.data.map(function(loc){
  								map[loc.locationId] = loc;
  							});
  							data.map(function(item){
  								item.lat = map[item.data.locationId].lat;
  								item.lng = map[item.data.locationId].lng;
  								item.weight = 1;
  							});

							renderHeatMap(data, gmap);
						}
					);
				}
		 	);
		}

		$scope.center = {
			lat: 41.85, // initial map center latitude
			lng: -87.65 // initial map center longitude
		};

		setTimeout(function(){

			var swBound = new google.maps.LatLng(41.45, -88.1);
			var neBound = new google.maps.LatLng(42.15, -87.35);
			var bounds = new google.maps.LatLngBounds(swBound, neBound);
			var srcImage = ""// "./sample.png"
		//	var overlay = new createMapOverlay(bounds, srcImage, $scope.map.instance);
			
			$scope.view = google.maps.MapTypeId.TERRAIN;
			$scope.map.instance.mapTypeId = $scope.view;

			$scope.styles = [ { "featureType": "administrative", "stylers": [ { "visibility": "off" } ] },{ "featureType": "poi", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.local", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.arterial", "stylers": [ { "hue": "#ff0900" }, { "lightness": 49 } ] },{ "featureType": "road.highway", "stylers": [ { "hue": "#ff0900" }, { "lightness": 48 } ] },{ "featureType": "transit", "stylers": [ { "visibility": "off" } ] },{ "featureType": "water", "stylers": [ { "hue": "#0091ff" }, { "lightness": 49 } ] },{ } ];
			$scope.styledMap = new google.maps.StyledMapType($scope.styles, {name: "Styled Map"});
			$scope.map.instance.mapTypes.set('map_style', $scope.styledMap);
	  		$scope.map.instance.setMapTypeId('map_style');

		}, 2000);	

		$scope.latitude = null;
		$scope.longitude = null;
		
		$scope.zoom = 11;
		
		$scope.markerLat = null;
		$scope.markerLng = null;

	});

	app.controller('ChartRenderingController_Geo', function ($scope){
		
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
						$scope.siteName = dp.id;
						$scope.$apply();
					},
					"ready" : function(){
						angular.element("#chart").removeClass("spinner");
					},
					"label" : {
						"datapointover" : "<span class='chart-number'>@count</span>"
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
					"datapointover" : "<span class='chart-number'>@ReportGrid.format(count/stats.tot * 100, \"P\")</span>"
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
				"horizontal" : true,
				"label" : {
					"datapointover" : "<span class='chart-focus'>@app</span><span class='chart-number'>@count</span>",
				}
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
					"datapointover" : "Max<span class='chart-number'>@maxSession</span>StdDev<span class='chart-number'>@ReportGrid.format(stdDev)</span>Total<span class='chart-number'>@totalTime</span>"
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
					"datapointover" : "<span class='chart-focus'>@app</span>Uses<span class='chart-number'>@count</span>Average Session<span class='chart-number'>@ReportGrid.format(aveSession)</span>Total Usage<span class='chart-number'>@ReportGrid.format(total)</span>",
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