var express = require('express');
var app = express();
var startTime = new Date();

app.get('/', function(req, res){
    // print out the number of milliseconds since the server started.

    var elapsedTime = new Date().getTime() - startTime.getTime();

    console.log('request received, sending ' + elapsedTime.toString());
    res.end("This server has been running for " + elapsedTime + "ms.\n");
});

/* Use PORT environment variable if it exists */
var port = process.env.PORT || 8080;
server = app.listen(port);

console.log('Server listening on port %d in %s mode', server.address().port, app.settings.env);
