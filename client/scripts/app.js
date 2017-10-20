// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages'
};

app.init = function() {
  return 1;
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
    url: app.server,
    type: 'GET',
    //data: message,
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
