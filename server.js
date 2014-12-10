'use strict';

var WebSocketServer = require('ws').Server,
    // fs = require('fs'),
    // util = require('util'),
    Tail = require('tail').Tail;

var wss, name;

name = 'log.txt';
wss = new WebSocketServer({port: 8080});

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
    // readStream = fs.createReadStream(name);
    // readStream.on('data', function (chunk) {
    //     ws.send('chunk:' + chunk);
    // });
    // readStream.on('end', function () {
    //     console.log('EOF');
    // });
    // fs.watch(name, function (event, filename) {
    //     fs.stat(name, function (err, stats) {
    //         if (err) { throw new Error(); }
    //         console.log(
    //             'event is: ' + event,
    //             'filename:' + filename,
    //             'size:' + JSON.parse(util.inspect(stats)).size
    //         );
    //         ws.send('size:' + util.inspect(stats));
    //     });
    // });
});
