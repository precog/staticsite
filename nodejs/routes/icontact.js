var https = require('https')
  , winston = require('winston');

function makeRequest(method, path, handler) {
    var options = {
        hostname: 'app.icontact.com',
        port: 443,
        path: path,
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Api-Version': '2.0',
            'Api-AppId': 'KDCT1QfMCjSa3nAXk4xE7KjIBzJwqSxi',
            'Api-Username': 'matthew@precog.com',
            'Api-Password': 'PrecogContacts'
        }
    };

    var req = https.request(options, function(res) {
        var body = '';
        res.on('data', function(data) {
            body += data; // FIXME: this breaks on multibyte UTF-8
        });
        res.on('end', function() {
            handler(JSON.parse(body));
        });
    });

    req.on('error', function(e) {
        winston.error(e);
    });

    req.end();
}

function makePost(path, post_data, handler) {
    var options = {
        hostname: 'app.icontact.com',
        port: 443,
        path: path,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Api-Version': '2.0',
            'Api-AppId': 'KDCT1QfMCjSa3nAXk4xE7KjIBzJwqSxi',
            'Api-Username': 'matthew@precog.com',
            'Api-Password': 'PrecogContacts',
            'Content-Length': post_data.length
        }
    };

    winston.info("Posting "+JSON.stringify(options));
    winston.info("Body: "+post_data);

    var req = https.request(options, function(res) {
        var body = '';
        res.on('data', function(data) {
            body += data; // FIXME: this breaks on multibyte UTF-8
        });
        res.on('end', function() {
            handler(JSON.parse(body));
        });
    });

    req.on('error', function(e) {
        winston.error(e);
    });

    req.write(post_data);
    req.end();
}

function getAccounts(callback) {
    makeRequest('GET', '/icp/a/', callback);
}

function getFolders(accountId, callback) {
    makeRequest('GET', '/icp/a/'+accountId+'/c', callback);
}

exports.accountId = function(req, res) {
    getAccounts(function(body) {
        winston.info(body);
        res.send(body);
    });
};

exports.folderId = function(req, res) {
    getAccounts(function(account) {
        var accountId = account.accounts[0].accountId;
        getFolders(accountId, function(body) {
            winston.info(body);
            res.send(body);
        });
    });
};

exports.register = function(req, res) {
    getAccounts(function(account) {
        var accountId = account.accounts[0].accountId;
        getFolders(accountId, function(folder) {
            makePost('/icp/a/'+accountId+'/c/'+folder.clientfolders[0].clientFolderId+'/contacts/', JSON.stringify(req.body), function(body) {
                winston.info(body);
                res.send(body);
            });
        });
    });
};

// vim: et sw=4 ts=4
