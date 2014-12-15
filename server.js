'use strict';

var http = require('http'),
    ws = require('ws'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    Tail = require('tail').Tail;

var wss, name, app, server;

app = connect();
app.use(serveStatic('./public', {'index': ['index.html', 'index.htm']}));
server = http.createServer(app).listen(8080);

name = 'log.txt';

wss = new ws.Server({server: server});

wss.on('connection', function (ws) {
    var tail; // readStream

    ws.on('message', function (message) {
        console.log('received: %s', message);
    });

    tail = new Tail(name);
    tail.on('line', function (data) {
        console.log(data);
        ws.send(data);
    });

    tail.on('error', function (err) {
        console.log('ERROR: ', err);
    });

    ws.on('close', function () {
        tail.unwatch();
        console.log('disconnected');
    });
});
