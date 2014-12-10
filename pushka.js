(function () {
    'use strict';
    var ws, url;

    url = 'ws://localhost:8080';
    ws = new WebSocket(url);
    ws.onopen = function (evt) {
        console.log('opened:' + evt.data);
        ws.send('opened');
    };
    ws.onclose = function (evt) {
        console.log('closed:' + evt.data);
    };
    ws.onmessage = function (evt) {
        console.log('messaged:' + evt.data);
    };
    ws.onerror = function (evt) {
        console.log('errored:' + evt.data);
    };
})();
/* eslint-env browser */
