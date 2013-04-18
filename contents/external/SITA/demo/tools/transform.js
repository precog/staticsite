console.log("loading data ...");

var data = require("../data/sample.json");

function padLeft(v, size, pad) {
	var len = (""+v).length,
		buf = new Array(size - len + 1);
	return buf.join(pad.substr(0)) + v;
}


var binSize = 1;
function aggregateDate(d) {

	var pos = 13,
		minute = parseInt(d.substr(pos)),
		base = d.substr(0,pos);
	minute = Math.floor(minute / binSize) * binSize;
	return base + padLeft(minute, 2, "0");
}

function addSpaceAt(s, pos) {
	return s.substr(0, pos) + " " + s.substr(pos);
}


var bins = {};

console.log("binning data ...");
data = data.map(function(item) {
	item.bin = addSpaceAt(aggregateDate(item.date), 10);
	var map = bins[item.bin] = bins[item.bin] || {};
	var user = map[item.id] = map[item.id] || { count : 0 };
	user.count++;
	if(user.count === 1 || item.date > user.item.date) {
		user.item = item;
	}
	var current = user.count
	return item;
})

console.log("removing garbage ...");
data.forEach(function(item) {
	item.date = item.bin;
	delete item.bin;
})

var originalLength = data.length;

data = [];
console.log("rebuilding array ...");
for(var date in bins) {
	if(!bins.hasOwnProperty(date)) continue;
	var map = bins[date];
	for(var id in map) {
		if(!map.hasOwnProperty(id)) continue;
		data.push(map[id].item);
	}
}

console.log("jsonification ...");
var content = JSON.stringify(data);

console.log("saving file ...");
var fs = require("fs");
fs.writeFileSync("../data/sample."+binSize+"min.json", content, "utf8");

console.log("COMPLETED: removed " + (originalLength - data.length) + " was " + originalLength);

/*

var fs = require("promised-io/fs");

fs.readFile("../data/sample.json", "utf8").then(function(json) {
	var arr = JSON.parse(json);
	console.log(arr);
});
*/