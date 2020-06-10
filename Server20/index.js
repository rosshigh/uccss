// require('look').start();

var express = require('express'),
    config = require('./config/config'),
    http = require('http'),
    https = require('https'),
    logger = require('./config/logger');

var app = express();

require('./config/express')(app, config);

// logger.log('info',"Creating HTTPS server on port: " + config.https_port);
// require('https').createServer({
//     key: fs.readFileSync("config/uccsstest.key"),
//     cert: fs.readFileSync("config/uccsstest_ucc_uwm_edu.cer") 
// }, app).listen(config.https_port, function () {
//     logger.log('info',"HTTPS Server listening on port: " + config.https_port + ", in " + app.get('env') + " mode");
// });



logger.log('info',"Creating HTTP server on port: " + config.port);
require('http').createServer(app).listen(config.port, function () {
    logger.log('info',"HTTP Server listening on port: " + config.port + " in " + app.get('env') + " mode");
});

// logger.log('info',"Creating HTTP server on port: " + config.port);
// require('http').createServer(function (req, res) {
//     res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
//     res.end();
// }).listen(config.port, function () {
//     logger.log('info',"HTTP Server listening on port: " + config.port + " in " + app.get('env') + " mode");
// });