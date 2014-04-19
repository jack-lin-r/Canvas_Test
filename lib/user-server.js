var socketio = require('socket.io'),
    User = require('./user-db.js'),
    io;

var mongoose = require('mongoose'),
    connStr = 'mongodb://localhost:27017/canvas';

mongoose.connect(connStr, function(err){
    if (err) throw err;
    console.log ('Successfully connected to MongoDB');
});



// manage socket
exports.listen = function(server){
  
    io = socketio.listen(server);
    io.set('log level', 2);
    io.set('flash policy port', 3005); 
    io.set('transports', [                     
        'websocket'
      , 'flashsocket'
      , 'htmlfile'
      , 'xhr-polling'
      , 'jsonp-polling'
    ]);


    io.sockets.on('connection', function(socket){
        console.log("Socket is connected by Jack");
        console.log("This is the socket id");
        console.log(socket.id);

    });

}







