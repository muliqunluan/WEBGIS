var page = 1; // 当前页数
// 监听加载更多按钮点击事件
document.getElementById('load-more-btn').addEventListener('click', loadMorePolls);

// 加载更多投票记录
function loadMorePolls() {
  // 发起加载更多投票记录的请求
  $.ajax({
    url: '/load-more-votings',
    type: 'GET',
    data: { page: page },
    success: function(response) {
      var data = response;

      // 处理返回的数据
      var polls = data.polls;
      var totalPages = data.totalPages;

      if (page === 1) {
        // 第一页的投票记录，清空原有内容
        clearPolls();
      }

      // 追加显示投票记录
      polls.forEach(function(voting) {
        var votingHtml = '<div class="voting">' +
          '<h3>' + voting.title + '</h3>' +
          '<p>' + voting.description + '</p>' +
          '<p>' + voting.username + '</p>' +
          '<p>' + voting.create_date + '</p>' +
          '</div>';

          $.ajax({
            url: '/load-option?poll_id=' + voting.id,
            method: 'GET',
            success: function(optionResponse) {
              if (optionResponse.length > 0) {
                console.log(optionResponse);
                votingHtml += '<ul>';
                optionResponse.forEach(function(option) {
                  
                  votingHtml += "<li onclick='voteOption(\""+ option.id +"\")'>" + option.text + "- Votes:" + option.vote_count + "</li>";
                });
                votingHtml += '</ul>';
              }
              votingHtml += '</div>';
              $('#voting-datas').append(votingHtml);
            },
            error: function(error) {
              console.error('Error loading voting options:', error);
            }
          });
      });

      if (page < totalPages) {
        // 还有更多页可供加载
        page++;
      } else {
        // 已经到底了，没有更多页可供加载
        document.getElementById('load-more-btn').disabled = true;
      }
    },
    error: function(error) {
      // 处理错误
      console.error('Error loading more polls:', error);
    }
  });
}
function voteOption(optionId){
  $.ajax({
    url:'/vote-option',
    type:'POST',
    data:{
      optionId:optionId
    },
    success:function(response){
      console.log(response);
      var voteCount = response.vote_count;
      $('#option-' + optionId + '-votes').text('Votes: ' + voteCount);
    },
    error:function(error){
      console.error('Error voting for option', error)
    }
  })
}
// 清空投票记录
function clearPolls() {
  $('#voting-datas').empty();
}