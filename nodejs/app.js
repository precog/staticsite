/* Copyright 2013, Reportgrid, Inc.
 * All rights reserved
 */

// Be strict

"use strict";

/**
 * Module dependencies.
 */

var express = require('express')
  , winston = require('winston')
  , nconf = require('nconf')
  , optimist = require('optimist')
  , routes = require('./routes')
  , icontact = require('./routes/icontact')
  , http = require('http')
  , path = require('path');

/**
 * nconf uses optimist to handle command line arguments, but it
 * does a bad job at validation, so we pre-validate options here.
 */
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
  'loglevel': {
    'alias': 'L',
    'describe': 'log level on log file (info/warn/error)'
  },
  'debug': {
    'alias': 'd',
    'describe': 'debug mode',
    'isBoolean': true
  },
  'help': {
    'alias': 'h',
    'describe': 'show this usage message',
    'isBoolean': true
  }
};

// Get the aliases for easy checking
var aliases = {}
Object.keys(options).forEach(function(option) {
  aliases[options[option].alias] = option;
});

// These are provided by argv as well
function isExtra(arg) {
  var extras = ['_', '$0'];
  return extras.indexOf(arg) > -1;
}

function isValidArg(arg) {
  return (arg in options) || (arg in aliases) || isExtra(arg);
}

function needsArgument(arg) {
  return (arg in options && !options[arg].isBoolean) || 
    (arg in aliases && !options[aliases[arg]].isBoolean);
}

var argv = optimist.options(options).argv;

if (argv.help) {
  optimist.showHelp();
  process.exit(1);
}

// Validate options
Object.keys(argv).forEach(function(arg) {
  // If a parameter is unknown, abort
  if (!isValidArg(arg)) {
    console.error("Invalid option "+arg);
    optimist.showHelp();
    process.exit(2);
  }

  if (needsArgument(arg) && typeof(argv[arg]) == "boolean") {
    console.error("Please provide a value for "+arg);
    optimist.showHelp();
    process.exit(3);
  }
});

/**
 * Precendence of configuration is:
 *
 * 1. command line arguments
 * 2. environment varibales
 * 3. configuration file
 *
 * Default configuration file is config.json on the cwd.
 */

nconf.argv(options).env();

if (argv.config) {
  nconf.file(argv.config);
} else {
  nconf.file({ file: "config.json" });
}

nconf.defaults({
  'bind': '0.0.0.0',
  'port': 3000,
  'loglevel': 'info'
});

/**
 * We log to a json file if one is provided by
 * the configuration (max 10MB, 30 files), and
 * we log to console if in debugging mode.
 *
 * Console logging always use the default log
 * level.
 *
 * The log includes both application level log
 * and NCSA data.
 */
winston.remove(winston.transports.Console);
if (nconf.get('debug')) {
  winston.add(winston.transports.Console, { 
    colorize: true, 
    timestamp: true,
    handleExceptions: !nconf.get('logfile')
  });
}

if (nconf.get('logfile')) {
  winston.add(winston.transports.File, { 
    filename: nconf.get('logfile'), 
    level: nconf.get('loglevel'),
    maxsize: 10 * 1024 * 1024,
    maxFiles: 30,
    handleExceptions: true 
  });
}

function chomp(raw_text) {
    return raw_text.replace(/(\n|\r)+$/, '');
}

var winstonStream = {
    write: function(message, encoding) {
        winston.info(chomp(message));
    }
};

// Configure express
var app = express();

// all environments
app.set('domain', nconf.get('bind'));
app.set('port', nconf.get('port'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger({stream:winstonStream}));
if (nconf.get('debug')) {
  app.use(express.logger('dev'));
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

app.get('/', routes.index); // For health checks
app.get('/nodejs/headers', routes.headers); // Dump headers
app.get('/nodejs/icontact/accountId', icontact.accountId);
app.get('/nodejs/icontact/folderId', icontact.folderId);
app.post('/nodejs/account/login', icontact.register);

process.on('SIGTERM', function(){
  winston.info('Express server terminating with SIGTERM');
  process.exit(0);
});

process.on('SIGINT', function(){
  winston.info('Express server interrupted with SIGINT');
  process.exit(0);
});

process.on('uncaughtException', function(err) {
  if(err.errno === 'EADDRINUSE') {
   winston.error("Could not bind to port "+app.get('port'));
  } else {
   winston.error(err);
  }
  process.exit(10);
});

http.createServer(app).listen(app.get('port'), app.get('domain'), function(){
  winston.info('Express server listening on port ' + app.get('port'));
});

// vim: et sw=2 ts=2
