$(document).ready(function() {
  $('#inbox').click(function() {
    $.ajax('/inbox', {
      method: 'GET',
      success: function(data) {
        if (data.length > 0) {
          var table = $('<table>').addClass('table table-bordered');
          var tbody = $('<tbody>');

          data.forEach(function(item) {
            var tr = $('<tr>');
            tr.html(`
              <td>${item.sender}</td>
              <td>${item.content}</td>
            `);
            tbody.append(tr);
          });

          table.append(tbody);
          $('#inboxTable').empty().append(table);
        } else {
          $('#inboxTable').text('没有人给你发消息');
        }
      },
      error: function(error) {
        console.log('Error:', error);
      }
    });
  });
});