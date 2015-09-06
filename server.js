var azure = require('azure-storage');
var http = require('http')
var port = process.env.PORT || 8000;
http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WORLD HELLO\n');
}).listen(port);