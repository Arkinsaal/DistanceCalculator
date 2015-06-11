var app = require('express')();
var http = require('http').Server(app);
var gm = require('googlemaps');
var util = require('util');

http.listen(3000, function(){
  	console.log('listening on *:3000');
});

var arrayOfOrigins = [
	
];

var destination = "";

var totalDistance = 0;

var j=0;
function nextRequest() {
	if (arrayOfOrigins[j]!=undefined) {
		gm.directions(arrayOfOrigins[j], destination, function(err, res) {
			if (res) {
				console.log(res.routes[0].legs[0].start_address + " is " + (res.routes[0].legs[0].distance.value/1000) + "km away");
				totalDistance += res.routes[0].legs[0].distance.value;
			} else {
				console.log(err);
			};
			j++;
			setTimeout(nextRequest, 1000);
		});
	} else {
		totalDistance+=(11408*3);
		util.puts('Total:')
		util.puts((totalDistance/1000) + "km");
		util.puts('Average:')
		util.puts(((totalDistance/arrayOfOrigins.length)/1000) + "km");
	};
};
nextRequest();


/*
var directionsRequest = {
  origin: arrayOfOrigins[0],
  destination: "Brisbane, QLD",
  travelMode: "DRIVING",
  transitOptions: TransitOptions,
  unitSystem: UnitSystem,
  durationInTraffic: Boolean,
  waypoints[]: DirectionsWaypoint,
  optimizeWaypoints: Boolean,
  provideRouteAlternatives: Boolean,
  avoidHighways: Boolean,
  avoidTolls: Boolean,
  region: String
}
*/


/*Total:
18811.381km
Average:
368.85060784313725km*/