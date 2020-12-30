$(function() {
    //调用getUserinfo  获取用户基本信息
    grtUserInfo();

    $('#btnLogin').on('click', function() {
        layer.confirm(
            '确认退出', { icon: 3, title: '提示' },

            function(index) {
                // do aomething
                // 1. 清空本地储存中的token
                localStorage.removeItem('token');

                // 2.重新跳转到登录页面
                location.href = '/login.html'

                // 关闭confirm询问框
                layer.close(index)
            }

        );
    })


    function grtUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",

            // headers  请求头配置对象
            // headers: {
            //     Authorization: localStorage.getItem("token") || ''
            // },
            success: function(res) {
                console.log(res);

                if (res.status !== 0) {
                    layui.layer.mag(res.message);
                    return;
                }

                // 调用renderAvatar   渲染头像
                renderAvatar(res.data);
            },

            error(err) {
                complete: function(res) {
                    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败')

                }
            }
        })
    }


    // 渲染用户的头像
    function renderAvatar(user) {

        //1.获取用户的名称
        const name = user.nickname || user.sername;
        console.log(name);

        $('#welcome').html('欢迎${name}');

        if (user.user_pic) {
            // 图片头像
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide();
        } else {

            // 文字头像
            const first = name[0].toUpperCase();
            $('.text-avatar').html(first).show();
            $('.layui-nav-img').hide();
        }





    }
})

//获取用户的基本信息