
/**
 * Module dependencies.
 */

var express = require('express')
  , winston = require('winston')
  , nconf = require('nconf')
  , optimist = require('optimist')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

/**
 * Precendence of configuration is:
 *
 * 1. command line arguments
 * 2. environment varibales
 * 3. configuration file
 *
 * Default configuration file is config.json on the cwd.
 */
nconf.defaults({
  'config': 'config.json',
  'domain': '0.0.0.0',
  'port': 3000
});

var options = {
  'config': {
    'alias': 'c',
    'describe': 'configuration file'
  },
  'port': {
    'alias': 'p',
    'describe': 'listening port'
  },
  'bind': {
    'alias': 'b',
    'describe': 'bind address'
  },
  'logfile': {
    'alias': 'l',
    'describe': 'log file'
  },
  'debug': {
    'alias': 'd',
    'describe': 'debug mode',
    'boolean': true
  },
  'help': {
    'alias': 'h',
    'describe': 'show this usage message',
    'boolean': true
  }
};

nconf.argv(options).env();
nconf.file(nconf.get('config'));

if (nconf.get('help')) {
  optimist.options(options);
  optimist.showHelp();
  process.exit(1);
}

if (nconf.get('logfile')) {
  winston.add(winston.transports.File, { filename: nconf.get('logfile') });
}

if (!nconf.get('debug')) {
  winston.remove(winston.transports.Console);
}

var app = express();

// all environments
app.set('domain', nconf.get('bind'));
app.set('port', nconf.get('port'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
if (nconf.get('debug')) {
  app.use(express.logger('dev')); // replace with winston
}
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.enable('trust proxy');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), app.get('domain'), function(){
  winston.info('Express server listening on port ' + app.get('port'));
});

// vim: et sw=2 ts=2
