$(function(){
    //var socket = io.connect();

    console.log("are you even here");
    var socket = io.connect('https://localhost:3005', {'flash policy port':3005} );
    socket.name = Math.random();
    console.log(socket.name);

    $.ajax({  
        url: '/login_bootstrap',  
        type: 'POST',  
        success: function (data) {  
            console.log("are you doing anything at all");
            console.log(data);  
        }  
    }); 


    //var socket_server = io_server.connect();
    
    /*
    $('#register').submit(function(e){
        e.preventDefault();
        console.log("login submit console");
        $('#change').append("login submit html manipulation");
    });
    */
   
});


