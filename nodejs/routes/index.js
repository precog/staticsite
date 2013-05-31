
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.headers = function(req, res) {
  res.send(req.headers);
};

exports.dump = function(req, res) {
  res.send({ 'headers': req.headers, 'body': req.body, 'query': req.query, 'route': req.route, 'cookies': req.cookies, 'signed cookies': req.signedCookies, 'path': req.path, 'protocol': req.protocol, 'originalUrl': req.originalUrl });
};

