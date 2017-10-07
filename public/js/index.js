var socket = io();

socket.on('connect', function () {
    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'Arne',
        text: 'Testing.'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from the server.');
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
});