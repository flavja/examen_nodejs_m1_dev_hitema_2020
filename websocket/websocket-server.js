const WebSocket = require('ws')
const webSocketServer = new WebSocket.Server({ port: 3003 });

let history = [];

webSocketServer.on('connection', webSocket => {
    webSocket.onmessage = messageEvent => {
        const message = messageEvent.data;
        history.push(message);
        webSocketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    };
    webSocket.send(JSON.stringify(history));
});

module.exports = webSocketServer;
