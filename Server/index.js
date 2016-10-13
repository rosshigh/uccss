var express = require('express'),
  config = require('./config/config'),
  http = require('http'),
  debug = require('debug')('uccss'),
  fs = require('fs'),
  path = require('path'),
  AsyncPolling = require('async-polling'),
  logger = require('./config/logger');

  AsyncPolling(function (end) {
    // Do whatever you want.
    logger.log("Polling...");
    var optionsget = {
        host : 'api.openweathermap.org', 
        path : '/data/2.5/weather?q=' + process.env.UCC_HOME + '&APPID=0f85bb931f8faad7e35b6f685aa4e931', 
        method : 'GET'
    };
    logger.log(optionsget.path);
    var reqGet = http.request(optionsget, function(res) {
        console.log("statusCode: ", res.statusCode);
        var str = '';
    
        res.on('data', function(d) {
            str = JSON.parse(d);
            console.info('GET result:\n');
            process.env.TEMP = str.main.temp;
            process.env.ICON = str.weather[0].icon;
            console.info('\n\nCall completed');
        });
    
    });
    reqGet.end();
    reqGet.on('error', function(e) {
        console.error(e);
    });
    // Then notify the polling when your job is done:
    end();
    // This will schedule the next call.
}, 10800000).run();

var app = express();

require('./config/express')(app, config);

logger.log("Creating HTTP server on port: " + config.port);
require('http').createServer(app).listen(config.port, function () {
    logger.log("HTTP Server listening on port: " + config.port + " in " + app.get('env') + " mode");
});

// logger.log("Creating HTTPS server on port: %s", config.port);
// require('https').createServer({
//     key: fs.readFileSync(path.join(__dirname, "keys", "server.key")),
//     cert: fs.readFileSync(path.join(__dirname, "keys", "server.crt")),
//     ca: fs.readFileSync(path.join(__dirname, "keys", "ca.crt")),
//     requestCert: true,
//     rejectUnauthorized: false
// }, app).listen(config.https_port, function () {
//     logger.log("HTTPS Server listening on port: %s, in %s mode", config.https_port, app.get('env'));
// });
