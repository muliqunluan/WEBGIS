$(document).ready(function() {
  $('#addData').submit(function(event) {
    event.preventDefault();

    var support = $('#support').val();
    var need = $('#need').val();
    var description = $('#description').val();
    var lon = $('#lon').val();
    var lat = $('#lat').val();

    var data = {
      support: support,
      need: need,
      description: description,
      lon: lon,
      lat: lat
    };

    $.ajax({
      url: '/data',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(response) {
        alert(response.message);
      },
      error: function(error) {
        console.log('Error:', error);
      }
    });
  });
});