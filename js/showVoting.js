$(document).ready(function(){
    var isLoading = false;// 防止重复加载

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            alert('可见');
            $(window).scroll(function() {
              if ($(window).scrollTop() + $(window).height() +1  >= $(document).height()) {
                // 滚动到页面底部时触发加载更多内容
                alert("到底了");
              }
            });
          }
        });
      });
      
      var targetElement = document.getElementById('main-votings');
      observer.observe(targetElement);

    function loadMoreVotings() {
        if(!isLoading) {
            isLoading = true;

            $.ajax({
                url:'/load-more-votings',
                method:'GET',
                success:function(response){
                    if(response.lenth>0){
                        response.forEach(function(voting){
                            var votingHtml = '';
                            $('#voting-datas').append(votingHtml);
                        });
                    }
                    isLoading = false;
                },
                error:function(){
                    isLoading = false;
                }
            }

            );
        }
    }
});