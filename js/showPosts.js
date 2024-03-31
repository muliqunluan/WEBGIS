$(document).ready(function() {
    var posts = $('#posts');
    var discuss_datas = $('#discuss-datas');
    var page = 1;
    sort = 'post_time';
    $('#sortByTime').click(function(){
      sort = 'post_time';
      fetchPostsData(page,'post_time','desc');
    });
    $('#sortByLikes').click(function(){
      sort = 'like_count';
      fetchPostsData(page,'like_count','desc');
    })
    function fetchPostsData(page, sort, order) {
      $.ajax('/post?page=' + page +'&sort=' + sort + '&order=' + order, {
        method: 'GET',
        success: function(data) {
          const totalPages = data.totalPages;
  
          // 生成分页元素
          let paginationHTML = generatePaginationHTML(page, totalPages);
  
          // 将分页元素插入到适当的 DOM 元素中
          $('#paginationContainer').html(paginationHTML);
  
          discuss_datas.html('');
          // 添加表头
          const headerRow = $('<tr>').addClass("header");
          headerRow.html(`
            <td class="col1">主题</td>
            <td>作者</td>
            <td>时间</td>
            <td>回复</td>
            <td>点赞</td>
          `);
          discuss_datas.append(headerRow);
  
          if (data.posts.length > 0) {
            const tbody = $('<tbody>');
            data.posts.forEach(function(item) {
              const tr = $('<tr>');
              tr.html(`
                <td class="col1"><a href="/post/${item.post_id}">${item.post_subject}</a></td>
                <td>${item.post_author}</td>
                <td>${item.post_time}</td>
                <td>${item.reply_count}</td>
                <td>${item.like_count}</td>
              `);
              tbody.append(tr);
            });
            discuss_datas.append(tbody);
          }
        },
        error: function(error) {
          console.log('Error:', error);
        }
      });
    }
  
    // 初始加载第一页的数据
    fetchPostsData(page, 'post_time', 'asc');
  
    // 分页点击事件
    $(document).on('click', '.page-link', function(event) {
      event.preventDefault();
      page = parseInt($(this).data('page'));
      var order = 'desc';
      fetchPostsData(page, sort, order);
    });
  
    function generatePaginationHTML(currentPage, totalPages) {
      const maxPageCount = 5; // 每次只显示当前页附近的 5 个页码
      let startPage = Math.max(1, currentPage - Math.floor(maxPageCount / 2));
      let endPage = Math.min(totalPages, startPage + maxPageCount - 1);
  
      if (endPage - startPage + 1 < maxPageCount) {
        startPage = Math.max(1, endPage - maxPageCount + 1);
      }
  
      let paginationHTML = '<div class="pagination"><ul class="pagination">';
  
      if (currentPage > 1) {
        paginationHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${currentPage - 1}">&laquo;</a></li>`;
      }
  
      for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
      }
  
      if (currentPage < totalPages) {
        paginationHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${currentPage + 1}">&raquo;</a></li>`;
      }
  
      paginationHTML += '</ul></div>';
  
      return paginationHTML;
    }
  });