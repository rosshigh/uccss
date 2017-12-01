require('look').start();

var express = require('express'),
    config = require('./config/config'),
    http = require('http'),
    https = require('https'),
    fs = require('fs'),
    path = require('path'),
    AsyncPolling = require('async-polling'),
    logger = require('./config/logger'),
    glob = require('glob');

  AsyncPolling(function (end) {
    // Do whatever you want.
    logger.log("Polling...");
    var optionsget = {
        host : 'api.openweathermap.org', 
        path : '/data/2.5/weather?q=' + config.UCC_HOME + '&APPID=' + config.weatherAPI,
        method : 'GET'
    };
    logger.log(optionsget.path);
   
    var reqGet = http.request(optionsget, function(res) {
        console.log("statusCode: ", res.statusCode);
        var str = '';
    
        res.on('data', function(d) {
            str = JSON.parse(d);
            console.info('GET result:\n');
            try {
                process.env.TEMP = str.main.temp;
                process.env.ICON = str.weather[0].icon;
                console.info('\n\nCall completed');
            }
            catch(error){
                console.log(error)
            }
        });
    
    });
     try {
         reqGet.end();
    }
    catch(error){
        console.log(error)
    }
   
    reqGet.on('error', function(e) {
        console.error(e);
    });
    // Then notify the polling when your job is done:
    end();
    // This will schedule the next call.
}, 3600000).run();

var app = express();

require('./config/express')(app, config);

logger.log("Creating HTTP server on port: " + config.port);
require('http').createServer(app).listen(config.port, function () {
    logger.log("HTTP Server listening on port: " + config.port + " in " + app.get('env') + " mode");
});

logger.log("Creating HTTPS server on port: " + config.https_port);
require('https').createServer({
    key: fs.readFileSync("config/uccsstest.key"),
    cert: fs.readFileSync("config/uccsstest_ucc_uwm_edu.cer") 
}, app).listen(config.https_port, function () {
    logger.log("HTTPS Server listening on port: " + config.https_port + ", in " + app.get('env') + " mode");
});
