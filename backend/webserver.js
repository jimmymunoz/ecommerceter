//Start
//https://github.com/expressjs/serve-static#serve-files-with-vanilla-nodejs-http-server
//cd /Applications/XAMPP/xamppfiles/htdocs/ecommerceter/backend/
//npm install finalhandler serve-static
//node webserver.js

var http = require('http');	

var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var serve = serveStatic("../frontend/");

var server = http.createServer(function(req, res) {
  var done = finalhandler(req, res);
  serve(req, res, done);
});
//var config = require('./config'); // get our config file

var port = 80;
server.listen(port);
console.log('---Web Server:  is Running :)----\nhttp://localhost:' + port + '');