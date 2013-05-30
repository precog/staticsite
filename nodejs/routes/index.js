
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.headers = function(req, res) {
  res.send(req.headers);
};

