$(function(){
  
  var socket = io.connect();

  var colorPurple = "#cb3594";
  var colorGreen = "#659b41";
  var colorYellow = "#ffcf33";
  var colorBrown = "#986928";
  var curColor = colorPurple;
  var clickColor = new Array();
  var paint;
    
  var clickX = new Array();
  var clickY = new Array();
  var clickDrag = new Array();


  socket.on('current_draw', function(draw_aggregate) {
    console.log(draw_aggregate);
  });

  socket.on('update_draw', function(position){
    redraw_perimeter(position.posX, position.posY, position.drag);
  });




  $('#canvas').mousedown(function(e){
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
    socket.emit('drawing', {posX: clickX, posY: clickY, drag: clickDrag});

  });

  $('#canvas').mousemove(function(e){
    if(paint){
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      redraw();
      socket.emit('drawing', {posX: clickX, posY: clickY, drag: clickDrag});
    }
  });

  $('#canvas').mouseup(function(e){
    //socket.emit('drawing', {posX: clickX, posY: clickY, drag: clickDrag});
    paint = false;
  });

  $('#canvas').mouseleave(function(e){
    //socket.emit('drawing', {posX: clickX, posY: clickY, drag: clickDrag});
    paint = false;
  });



  function addClick(x, y, dragging)
  {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    clickColor.push(curColor);
  }

  function redraw(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;
       
    for(var i=0; i < clickX.length; i++) {    
      context.beginPath();
      if(clickDrag[i] && i){
        context.moveTo(clickX[i-1], clickY[i-1]);
      }else{
        context.moveTo(clickX[i]-1, clickY[i]);
      }
      context.lineTo(clickX[i], clickY[i]);
      context.closePath();
      context.stroke();

    }

  }

  function redraw_perimeter(posX, posY, drag){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;
    for(var i=0; i < posX.length; i++) {    

      context.beginPath();
      if(drag[i] && i){
        context.moveTo(posX[i-1], posY[i-1]);
      }else{
        context.moveTo(posX[i]-1, posY[i]);
      }
      context.lineTo(posX[i], posY[i]);
      context.closePath();
      context.stroke();

    }
  }


});


