
var socket = new WebSocket('ws://localhost:8080');
 socket.onmessage = function (event) {
   var obj = JSON.parse(event.data);
   document.getElementById('x').innerHTML = obj.d.accelX;
   document.getElementById('y').innerHTML = obj.d.accelY;
   document.getElementById('z').innerHTML = obj.d.accelZ;
  console.log(event.data);


};
