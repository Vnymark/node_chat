let socket = io();

socket.on('connect', function () {
    console.log('connected to server');

});

socket.on('disconnect', function () {
    console.log('Disconnected from the server.');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('HH:mm');
    var li = jQuery('<li></li>');
    li.text(`${message.from} - ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
    from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});