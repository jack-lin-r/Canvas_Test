var socketio = require('socket.io'),
    User = require('./user-db.js'),
    io;

var mongoose = require('mongoose'),
    connStr = 'mongodb://localhost:27017/canvas';

mongoose.connect(connStr, function(err){
    if (err) throw err;
    console.log ('Successfully connected to MongoDB');
});


var positionX = new Array();
var positionY = new Array();
var position_aggregate = {posX: [], posY: [], drag: []};


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
        console.log("Socket is connected test");
        retrieve_draw(socket);
        draw_broadcast(socket);
    });
}


function retrieve_draw(socket){
    
    if (position_aggregate.length != 0){
        socket.emit("current_draw", position_aggregate);
    }
}

function draw_broadcast(socket){
    socket.on("drawing", function(position){
        position_aggregate.posX = position_aggregate.posX.concat(position.posX);
        position_aggregate.posY = position_aggregate.posY.concat(position.posY);
        position_aggregate.drag = position_aggregate.drag.concat(position.drag);

        io.sockets.emit("update_draw", 
            {
            posX: position_aggregate.posX, 
            posY: position_aggregate.posY, 
            drag: position_aggregate.drag
            });
    });
}






