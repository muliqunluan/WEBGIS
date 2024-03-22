$(document).ready(function() {
  $('#email-form').submit(function(event) {
    event.preventDefault();
    var to = $('#to').val();
    var message = $('#message').val();
    var data = {
      to: to,
      message: message
    };
    $.ajax('/message', {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(data) {
        alert(data.message);
      },
      error: function(error) {
        console.log('Error', error);
      }
    });
  });
});