/*
* app.js - Express server statisc files
*/

/*jslint        browser: true,      continue: true,
devel: true,    indent:2,           maxerr: 50,
newcap: true,   nomen: true,        plusplus: true,
regexp: true,   sloppy: true,       vars: false,
white: true
*/


// -------------------- BEGIN MODULE SCOPE VARIABLES ----------------
'use strict';
var
  http = require('http'),
  express = require('express'),
  app = express(),
    logger = require('morgan'),
    errorHandler = require('errorhandler'),
    auth = require('basic-auth'),
  server = http.createServer(app),
  routes = require('./routes'),
  env = process.env.NODE_ENV || 'development';
// ---------------------- END MODULE SCOPE VARIABLES ----------------

// --------------------- BEGIN SERVER CONFIGURATION -----------------
app.use(require('body-parser')());
app.use(require('method-override')());

/* needs to be loaded before the router middleware*/
app.use(function(req, res, next) {
    var user = auth(req);

    if (user === undefined || user['name'] !== 'username' || user['pass'] !== 'password') {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
        res.end('Unauthorized');
    } else {
        next();
    }
});

app.use(express.static(__dirname + '/public'));

if ('development' == env) {
   // configure stuff here
  app.use(logger('combined'));
  app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
}

routes.configureRoutes(app, server);

// ------------------- END SERVER CONFIGURATION ---------------------

server = http.createServer(app);
server.listen(3000);
console.log('Listen on port %d', server.address().port);
