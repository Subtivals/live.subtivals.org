(function () {
    var token = window.location.hash.slice(1);
    token = atob(token);
    if (!/.*\/.*/.test(token)) {
        throw new Error("Invalid credentials format.");
    }

    // If the token format changes here, then the link displayed in Subtivals
    // should change too (see `WebLive::liveUrl()` in `weblive.cpp`).
    var credentials = token.split("|");
    var server = credentials[0];
    var secret = credentials[1];
    var connection = new WebSocket(server);

    var subtitleDiv = document.querySelector('.subtitle');

    subtitleDiv.innerHTML = 'Connecting...';

    connection.onopen = function () {
        subtitleDiv.innerHTML = 'Connected.';
    };

    connection.onerror = function (error) {
        console.error(error);
    };

    connection.onmessage = function (message) {
        var data;
        try {
            data = JSON.parse(message.data);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }

        // filter messages by channel
        // XXX: subscribe and route on server.
        if (data.channel != secret) {
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
