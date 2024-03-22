$(document).ready(function() {
  $('#subPost[type=submit]').click(function(event) {
    event.preventDefault();
    var post_subject = $('#post-subject').val();
    var post_content = $('#post-content').val();

    if (post_subject.trim().length === 0) {
      alert('请输入标题！');
      return;
    }

    var data = {
      post_subject,
      post_content
    };

    $.ajax('/addPost', {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(data) {
        alert(data.message);
        $('#newPostModal').modal('hide');
      },
      error: function(error) {
        console.log('Error', error);
      }
    });
  });
});