let socket = io();

socket.on('connect', function () {
    console.log('connected to server');

});

socket.on('disconnect', function () {
    console.log('Disconnected from the server.');
});

socket.on('newMessage', function (message) {
    var template = jQuery('#message-template').html();
    var formattedTime = moment(message.createdAt).format('HH:mm');
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        time: formattedTime

    });

    jQuery('#messages').append(html);
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