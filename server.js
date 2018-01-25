var http = require('http');
var express = require("express");
var RED = require("node-red");


const WebSocket = require('ws');

var wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  var obj;
  var z;
  var x;

  ws.on('message', function incoming(message) {
    obj = JSON.parse(message);
    z = obj.d.accelZ;
    y = obj.d.accelY;
    x = obj.d.accelX;
    console.log("x: " + x + " y: " + y + " z: " + z);

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });

  });

});


// Create an Express app
var app = express();

// Add a simple route for static content served from 'public'
app.use("/",express.static("public"));

// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
    httpAdminRoot:"/red",
    httpNodeRoot: "/api",
    userDir:"/home/set0jl/CC2560/nol/.nodered/",
    functionGlobalContext: { }    // enables global context
};

// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(4000);

// Start the runtime
RED.start();
