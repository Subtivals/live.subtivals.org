var WebSocketServer = require('websocket').server;
var http = require('http');

var SERVER_PORT = 3141;

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});
server.listen(SERVER_PORT, function() {});

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

var clients = [];

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    console.log('user connected');
    var index = clients.push(connection) - 1;

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // process WebSocket message
            console.log(message);
            for (var i=0; i < clients.length; i++) {
                clients[i].sendUTF(message.utf8Data);
            }
        }
    });

    connection.on('close', function(connection) {
        // close user connection
        console.log('user disconnected');
        clients.splice(index, 1);
    });
});

console.log('Running on port ' + SERVER_PORT + '...');

