var map;

var filter = function(item, where) {
  for(var key in where) {
    if(item[key] !== where[key])
      return false;
  }
  return true;
};

function filterSet(where, callback) {
  if(!data) {
    setTimeout(function() { filterSet(where, callback); }, 50);
    return;
  }
  var filtered = [];
  data.forEach(function(item) {
    if(filter(item, where))
      filtered.push(item);
  });
  callback(filtered);
}


self.addEventListener('message', function(e) {
  if(!e.data.where) return;

	filterSet(e.data.where, function(filtered) {
    self.postMessage({ data : filtered, where : e.data.where });
  });
}, false);


self.addEventListener('message', function(e) {
  if(!e.data.data) return;
  data = e.data.data;
}, false);

function parseFunction(s) {

}

self.addEventListener('message', function(e) {
  if(!e.data.filter) return;
  var value = e.data.filter;
  if (!value || typeof value !== "string" || value.substr(0,8) !== "function") return;

  var startBody = value.indexOf('{') + 1,
      endBody = value.lastIndexOf('}'),
      startArgs = value.indexOf('(') + 1,
      endArgs = value.indexOf(')');
  
  filter = new Function(value.substring(startArgs, endArgs), value.substring(startBody, endBody));
}, false);