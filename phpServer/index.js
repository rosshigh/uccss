var express = require('express');
var php = require("node-php"); 
var path = require("path");

var app = express();

app.use("/php", php.cgi("php")); 
app.use(express.static(path.normalize(__dirname) + '/public'));

var port = 9090;
require('http').createServer(app).listen(port, function () {
    console.log("HTTP Server listening on port: " + port );
});
