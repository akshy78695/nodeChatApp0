
    let socket = io();

    socket.on('connect', function() {
        console.log('connected to server');
    });

    socket.on('disconnect', function() {
        console.log('disconnected to server');
    });


    socket.on('newMessage', function(message){
        let time = moment(message.createdAt).format('h:mm a');

        let li = $('<li></li>');
        li.text(`${message.from} ${time}: ${message.text}`);

        $('#messages').append(li);
        
    });

    socket.on('newLocationMessage', function(message){
        let time = moment(message.createdAt).format('h:mm a');
        console.log(message, 'aksdjasjk');
        let li = $('<li></li>')
        let a = $('<a target="_blank">Location</a>');

        li.text(`${message.from} ${time}: `);
        a.attr('href', message.url);

        li.append(a);

        $('#messages').append(li);
    });

    $('#send').click(function(e) {
        e.preventDefault();
        
        socket.emit('createMessage', {
            from: "user",
            text: $('#msg-input').val()
        }, function() {
            $('input[name=message]').val("");
        });
    });

    let locationButton = $('#send-location');

    locationButton.click(function(){
        if(!navigator.geolocation){
            return alert('Geolocation is not supported by your browser');
        }

        locationButton.attr('disabled', 'disabled').text('Sending');

        navigator.geolocation.getCurrentPosition(function(position){
            locationButton.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function(){
            locationButton.removeAttr('disabled').text('Send location');
            alert('Unable to fatch location');
        });
    });