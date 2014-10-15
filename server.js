var http = require('http');

var startTime = new Date();

var PORT = 8000;

var server = http.createServer(function(req, res){
    // for any request, print out the number of milliseconds since the server started.

    var elapsedTime = new Date().getTime() - startTime.getTime();

    console.log('request received, sending ' + elapsedTime.toString());
    res.end(elapsedTime.toString());
});

server.listen(PORT);

console.log('simple node.js server started and listening on port: ' + PORT);
