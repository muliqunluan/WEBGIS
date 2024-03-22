document.addEventListener('DOMContentLoaded', function () {
    var page = 1;
    var replies = this.getElementById('replies');
    var postId = parseInt(window.location.pathname.split('/').pop());

    function fetchPostsData(page) {
        fetch('/reply?page=' + page+'&postId=' + postId)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(function (data) {
                const totalPages = data.totalPages;
                //生成分页元素
                let paginationHTML = '<div class="pagination"><ul class="pagination">';
                for (let i = 1; i <= totalPages; i++) {
                    paginationHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
                }
                paginationHTML += '</ul></div>';
                //将分页元素插入到DOM
                document.getElementById('paginationContainer').innerHTML = paginationHTML;
                //replies.innerHTML = '';
                //添加表头
                const headerRow = document.createElement('thead');
                headerRow.innerHTML = `
            <tr>
            <th scope="col">
              <%=post.post_author%>
            </th>
            <th scope="col">
              <%=post.post_content%>
            </th>
            </tr>
            `;
                if (data.replies.length > 0) {
                    const tbody = document.createElement('tbody');
                    data.replies.forEach(function (item) {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                        <td style="width: 30%;">
                        <div class="layui-card">
                        <div class="layui-card-body"><strong style="color: black;">${item.username}</strong></div>
                        </div>
                        </td>
                        <td style="width: 70%;">
                        <div class="layui-card">
                        <div class="layui-card-body"></div>
                        <div class="layui-card-body">${item.content}</div>
                        <div class="layui-card-body">${item.reply_time}</div>
                        </div>
                        </td>
                        `;
                        tbody.appendChild(tr);
                    });
                    replies.appendChild(tbody);
                }
            })
            .catch(function (error) {
                console.log('Error', error)
            })
    }
    // 初始加载第一页数据
    fetchPostsData(page);
    // 分页点击事件
    document.addEventListener('click', function (event) {
        if (event.target.matches('.page-link')) {
            event.preventDefault();
            page = parseInt(event.target.dataset.page);
            fetchPostsData(page);
        }
    });
});