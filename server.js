var express = require('express');
var app = express();
var server = require('http').Server(app);
app.use(express.static(__dirname+'/www'));
var PORT = process.env.PORT || 5000;
server.listen(PORT);
console.log("Server started on port" + PORT);
