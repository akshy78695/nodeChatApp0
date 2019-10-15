
    let socket = io();

    socket.on('connect', function() {
        console.log('connected to server');
    });

    socket.on('disconnect', function() {
        console.log('disconnected to server');
    });


    socket.on('newMessage', function(message){
        console.log('a New Message', message);

        let li = $('<li></li>');
        li.text(`${message.from}: ${message.text}`);

        $('#messages').append(li);
        
    });

    $('#send').click(function(e) {
        e.preventDefault();

        socket.emit('createMessage', {
            from: "user",
            text: $('#msg-input').val()
        }, function() {

        });
    });