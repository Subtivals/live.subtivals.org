(function () {
    var SERVER = "ws://95.85.60.144:3141/";

    var connection = new WebSocket(SERVER);

    var subtitleDiv = document.querySelector('.subtitle');    

    subtitleDiv.innerHTML = 'Connecting...';

    connection.onopen = function () {
        subtitleDiv.innerHTML = 'Connected.';
    };

    connection.onerror = function (error) {
        console.error(error);
    };

    connection.onmessage = function (message) {
        // try to decode json (I assume that each message from server is json)
        try {
            var data = JSON.parse(message.data);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }
        // handle incoming message
        var event = data.type;
        if (event == 'add-subtitle') {
            subtitleDiv.innerHTML = data.content;
        }
        else {
            subtitleDiv.innerHTML = '';
        }
    };
})();
