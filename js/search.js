$(document).ready(function() {
  $('#search-form').submit(function(event) {
    event.preventDefault();

    const word = $('#sole-input').val();

    $.ajax({
      url: '/search',
      data: { word: word },
      dataType: 'json',
      success: function(data) {
        $('#searchResults').empty();
        if (data.length > 0) {
          const table = $('<table>').addClass('table table-bordered');
          const tbody = $('<tbody>');

          $.each(data, function(index, item) {
            const tr = $('<tr>');
            tr.html(`
              <td>${item.support}</td>
              <td>${item.need}</td>
              <td>${item.description}</td>
            `);
            tbody.append(tr);
          });

          table.append(tbody);
          $('#searchResults').empty().append(table);
        } else {
          $('#searchResults').text('没有结果');
          window.location.href = '/main';
        }
      },
      error: function(error) {
        console.log('Error:', error);
      }
    });
  });
});