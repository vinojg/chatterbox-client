// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
  container: {},
  contained: $("input[type=text]").val(),
  roomname: [] 
};


app.init = function() {
  app.fetch();
  // var message = {
  //   username: 'Simba',
  //   text: `It's good to be the king`, //'It\'s good to be the king',
  //   roomname: 'lobby'
  // };
  // app.send(message);
};

app.send = function(message) {
  // var message = {
  //   username: 'Mel Brooks',
  //   text: `It's good to be the king`, //'It\'s good to be the king',
  //   roomname: 'lobby'
  //   };
  
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: app.server,  //+ '?limit=20&skip=', // + n * 20,
    //  + '?limit=20&skip=' + n*20
    type: 'GET',
    data: {
      order: '-createdAt',
      //limit: 3
    },
    contentType: 'application/json',
    success: function (data) {
      app.clearMessages();
      app.container = data.results;
      _.each(app.container, function(message) {
        if (!app.roomname.includes(message.roomname) && typeof(message.roomname) === 'string') {
          app.roomname.push(message.roomname);
        }
      });
      _.each(app.container, function(message) {
        //app.renderMessage(JSON.stringify(message));
        app.renderMessage(message.updatedAt);
        app.renderMessage(message.roomname);  
        app.renderMessage(message.username);
        app.renderMessage(message.text);
        
      });
      console.log(app.roomname);
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
  //console.log(app.container);
  // console.log('Testing');
  // console.log(data);
};

app.clearMessages = function() {
  $('#chats').empty();
  //$('#chats').children().remove();
};

app.renderMessage = function(message) {

  $('#chats').append(`<div>${message}</div>`);
};

app.renderRoom = function(roomName) {
  $('#roomSelect').append(`<div>${roomName}</div>`);
};


app.handleUsernameClick = function() {
  
};

app.handleSubmit = function() {
  
};



/*
To do:

Add images
Create dropdown for rooms
Filter messages by roomname

Done:
Post messages from submit form
Live refresh
*/



