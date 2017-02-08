'use strict';

/*
CREATE TABLE welcomes
(
  id       SERIAL NOT NULL,
  welcome  character varying(128) NOT NULL
);

INSERT INTO welcomes (welcome) VALUES ('Hello');
INSERT INTO welcomes (welcome) VALUES ('Bonjour');
INSERT INTO welcomes (welcome) VALUES ('Hola');
INSERT INTO welcomes (welcome) VALUES ('Salaam');
INSERT INTO welcomes (welcome) VALUES ('Hallo');
INSERT INTO welcomes (welcome) VALUES ('Konichiwa');

GRANT SELECT, UPDATE, INSERT, DELETE ON welcomes TO frontend

*/

const express = require('express'),
      pg = require('pg'),
      url = require('url');

let app = express(),
    serverStartTime = Date.now();

app.get('/', function(req, res){
    // print out the number of milliseconds since the server started.
    var elapsedTime = Date.now() - serverStartTime;
    res.end(`This server has been running for ${elapsedTime}ms.\n`);
});

app.get('/query', function(req, res) {
    // make a simple query and display the value and latency
    let requestStartTimestamp = Date.now();

    let query = "SELECT welcome FROM welcomes ORDER BY random() LIMIT 1";
    databasePool.connect((err, client, done) => {
        if (err) {
            console.log(err);
            return res.send(500);
        }

        client.query(query, (err, results) => {
            console.dir(results);
            done();
            if (err) {
                console.log(err);
                return res.send(500);
            }

            let requestDuration = Date.now() - requestStartTimestamp;
            res.send(`${results.rows[0].welcome}! (took ${requestDuration}ms)\n`);
        });
    });
});

const params = url.parse(process.env.WELCOMES_DB_CONNECTION_STRING);
const auth = params.auth.split(':');

const config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1]
};

let databasePool = new pg.Pool(config);

var port = process.env.PORT || 8080;
let server = app.listen(port);

console.log('Server listening on port %d in %s mode', server.address().port, app.settings.env);
