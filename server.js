var http = require('http');

var startTime = new Date();

var PORT = process.env.PORT || 5000;

var server = http.createServer(function(req, res){
    // for any request, print out the number of milliseconds since the server started.

    var elapsedTime = new Date().getTime() - startTime.getTime();

    console.log('request received, sending ' + elapsedTime.toString());
    res.end("This server has been running for " + elapsedTime + "ms.\n");
});

server.listen(PORT);

console.log('simple node.js server started and listening on port: ' + PORT);
