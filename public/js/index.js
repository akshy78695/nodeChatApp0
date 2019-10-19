
    let socket = io();

    function scrollToButtom(){
        let messages = $('#messages');
        let newMessage = messages.children('li:last-child');

        let clientHeight = messages.prop('clientHeight');
        let scrollTop = messages.prop('scrollTop');
        let scrollHeight = messages.prop('scrollHeight');
        let newMessageHeight = newMessage.innerHeight();
        let lastMessageHeight = newMessage.prev().innerHeight();

        if(clientHeight + scrollTop +newMessageHeight + lastMessageHeight >= scrollHeight){
            messages.scrollTop(scrollHeight);
        }

    }

    socket.on('connect', function() {
        console.log('connected to server');
    });

    socket.on('disconnect', function() {
        console.log('disconnected to server');
    });


    socket.on('newMessage', function(message){
        let time = moment(message.createdAt).format('h:mm a');
        let template = $('#message-template').html();
        let html = Mustache.render(template, {
            text: message.text,
            from: message.from,
            createdAt: time
        });
        $('#messages').append(html);
        scrollToButtom();
        
    });

    socket.on('newLocationMessage', function(message){
        let time = moment(message.createdAt).format('h:mm a');
        let template= $('#location-message-template').html();
        let html = Mustache.render(template, {
            createdAt: time,
            from: message.from,
            url: message.url
        });

        $('#messages').append(html);
        scrollToButtom();
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