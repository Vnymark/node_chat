let socket = io();

function scrollToBottom() {
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }

}

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
    scrollToBottom();
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