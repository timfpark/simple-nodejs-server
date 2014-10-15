var http = require('http');

var startTime = new Date();

var server = http.createServer(function(req, res){
    // for any request, print out the number of milliseconds since the server started.

    var elapsedTime = new Date().getTime() - startTime.getTime();
    res.end(elapsedTime.toString());
});

server.listen(8000);
