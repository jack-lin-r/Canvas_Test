var http = require('http'),                   // for using http server
	express = require('express'),               // for using express framework
	https = require('https'),                   // for using https server
	fs = require('fs'),                         // for using file system to get .pem file
	UserServer = require('./lib/user-server');  // for using other backend code

// using express
var app = express();

// configure express
app.configure(function(){
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// create server for http
var httpserver = http.createServer(app).listen('4003', '127.0.0.1');
// let the backend listens to this server
UserServer.listen(httpserver);


// main starting page
app.get('/', function(req, res){
    
    res.sendfile(__dirname + '/views/index.html');
});













