$(document).ready(function() {
    // 监听表单输入，检查是否满足发布条件
    $('#votingForm input').on('input', function() {
      var theme = $('#votingTheme').val().trim();
      var option1 = $('#option1').val().trim();
      var option2 = $('#option2').val().trim();
      var option3 = $('#option3').val().trim();
      var option4 = $('#option4').val().trim();
      var option5 = $('#option5').val().trim();

      if (theme !== '' && (option1 !== '' || option2 !== '') && (option1 !== '' || option2 !== '' || option3 !== '' || option4 !== '' || option5 !== '')) {
        $('#publishBtn').prop('disabled', false);
      } else {
        $('#publishBtn').prop('disabled', true);
      }
    });
  });

