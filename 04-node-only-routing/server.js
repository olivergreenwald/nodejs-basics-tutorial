var http = require('http');

//import module
var app = require('./app');

http.createServer(app.handleRequest).listen(8000);
