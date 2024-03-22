$(document).ready(function () {
    // 监听回帖表单的提交事件
    $('#replyForm').submit(function (event) {
        event.preventDefault(); // 阻止表单默认提交行为
        // 获取当前路由中的数字
        var currentRoute = window.location.pathname; // 获取当前页面路径
        var postId = currentRoute.match(/\/post\/(\d+)/)[1]; // 使用正则表达式提取数字部分
        // 获取回帖内容
        var content = $('textarea[name="reply-content"]').val();
        // 创建一个对象存储回帖数据
        var replyData = {
            content: content,
            postId: postId
        };

        // 发送回帖数据到服务器
        $.post('/addreply', replyData, function (response) {
            // 处理服务器的响应
            if (response.ok) {
                // 回帖成功，动态添加回帖内容到页面
                var newRow = '<tr>' +
                    '<td>' + response.username + '</td>' +
                    '<td>' + response.content + '</td>' +
                    '</tr>';
                $('tbody').append(newRow);
                

                // 清空回帖表单
                $('input[name="content"]').val('');
                alert('回帖成功：'+response.message);
                $('#newReplyModal').modal('hide');
            } else {
                // 回帖失败，显示错误消息
                alert(response.message);
                $('#newReplyModal').modal('hide');
            }
        });
    });
}); 