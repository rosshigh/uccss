var express = require('express'),
  config = require('./config/config'),
  debug = require('debug')('uccss'),
  fs = require('fs'),
  path = require('path');

var app = express();

require('./config/express')(app, config);

debug("Creating HTTP server on port: %s", config.port);
require('http').createServer(app).listen(config.port, function () {
    debug("HTTP Server listening on port: %s, in %s mode", config.port, app.get('env'));
});

debug("Creating HTTPS server on port: %s", config.port);
require('https').createServer({
    key: fs.readFileSync(path.join(__dirname, "keys", "server.key")),
    cert: fs.readFileSync(path.join(__dirname, "keys", "server.crt")),
    ca: fs.readFileSync(path.join(__dirname, "keys", "ca.crt")),
    requestCert: true,
    rejectUnauthorized: false
}, app).listen(config.https_port, function () {
    debug("HTTPS Server listening on port: %s, in %s mode", config.https_port, app.get('env'));
});
