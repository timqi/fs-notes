var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = 'localhost';
var port = 3000;

var notFoundRes = function(res) {
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.end('<html><body><h1>Error 404</h1></body></html>');
}

var server = http.createServer(function(req, res){
  console.log('Request for ' + req.url+" by method "+req.method);
  if (req.method != 'GET') {
    notFoundRes(res);
    return;
  }

  var fileUrl;
  if (req.url == '/') {
    fileUrl = '/index.html';
  } else {
    fileUrl = req.url;
  }

  var filePath = path.resolve('./public'+fileUrl);
  var fileExt = path.extname(filePath);

console.log('## : '+filePath);
  if (fileExt == '.html') {
    fs.exists(filePath, function(exists){
      if (exists) {
        res.writeHead(200, {'Content-Type':'text/html'});
        fs.createReadStream(filePath).pipe(res);
      } else {
        notFoundRes(res);
        return;
      }
    });
  } else {
    notFoundRes(res);
    return;
  }
});

server.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
