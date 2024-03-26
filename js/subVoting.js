$(document).ready(function() {
  // 监听表单输入，检查是否满足发布条件
  $('#votingForm input').on('input', function() {
    var theme = $('#votingTheme').val().trim();
    var options = [];
    
    // 获取所有选项的值
    $('.option-input').each(function() {
      var optionValue = $(this).val().trim();
      if (optionValue !== '') {
        options.push(optionValue);
      }
    });

    if (theme !== '' && options.length >= 2) {
      $('#publishBtn').prop('disabled', false);
    } else {
      $('#publishBtn').prop('disabled', true);
    }
  });
});
