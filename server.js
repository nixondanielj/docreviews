var http = require('http');
var express = require('express');

var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname + '/client'));

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});