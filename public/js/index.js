
    let socket = io();

    socket.on('connect', function() {
        console.log('connected to server');
    
        

        socket.emit('createMessage', {
            from: 'akshay@msg.com',
            text: "kaisan ba (by msgnger)",
            createdAt: new Date().now
        });
    });

    socket.on('disconnect', function() {
        console.log('disconnected to server');
    });


    socket.on('newMessage', function(message){
        console.log('a New Message', message);
    });