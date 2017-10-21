// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
  container: {} 
};

$('.username').on('click', 'button', console.log('clicked!'));

app.init = function() {
  app.fetch();
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
    data: message,
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
    url: app.server, // + '?limit=20&skip=', // + n * 20,
    //  + '?limit=20&skip=' + n*20
    type: 'GET',
    //data: message,
    contentType: 'application/json',
    success: function (data) {
      //console.log(data.results);
      //console.log('chatterbox: Message sent', data);
      // console.log(app.container);
      app.container = data.results;
      _.each(app.container, function(message) {
        app.renderMessage(message.username);
        app.renderMessage(message.text);
        
      });
      //console.log(app.container);
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
Create dropdown for rooms
Filter messages by roomname
Post messages from submit form
*/



