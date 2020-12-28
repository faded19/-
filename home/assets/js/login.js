$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })



    var form = layui.form
    var layer = layui.layer
        // 从layui中获取form对象
    form.verify({

        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: (res) => {
                if (res.status !== 0) {
                    layer.msg(res.message || '注册失败')
                }
                layer.msg(res.message || '注册成功');

                //自动跳转
                $('#link_login').click()
            }
        })
    })
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg(res.message);
                    return;
                }
                layer.msg('登陆成功')
                localStorage.getItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})