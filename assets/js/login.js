$(function () {
  // 从 layui 中提取 form 表单, layer 弹出层模块
  const { form, layer } = layui 

  // 1. 点击链接进行表单切换
  $('.link a').click(function () {
    $('.layui-form').toggle()
  })


  // 2. 校验表单项
  form.verify({
    pass: [
      /^\w{6,12}$/,
      '密码只能在6到12位之间'
    ],
    samePass: function (value) { // value 表示当前表单项的值
      if (value !== $('#pass').val()) {
        return '两次密码输入不一致'
      }
    }
  })

  // 3. 实现注册功能
  $('.reg-form').submit(function (e) {
    // 阻止默认提交
    e.preventDefault()

    // 发送 ajax
    axios.post('/api/reguser', $(this).serialize())
         .then(res => {
            console.log(res)
            // 校验失败
            if (res.status !== 0) {
              return layer.msg('注册失败!')
            }
            // 自动跳转到登录
            layer.msg('注册成功!')
            $('.login-form a').click()
         })
  })

  // 4. 实现登录功能
  $('.login-form').submit(function (e) {
    e.preventDefault()

    // 发送 ajax
    axios.post('/api/login', $(this).serialize())
         .then(res => {
           console.log(res)
          // 校验请求失败
          if (res.status !== 0) {
            return layer.msg('登录失败!')
          }

          // 登录成功后, 首先把 token (个人身份凭证, 令牌) 保存本地存储
          localStorage.setItem('token', res.token)

          // 提示登录成功
          layer.msg('登录成功!', {
            time: 500
          }, function () {
            // 跳转到首页
            location.href = './index.html'
          })
         })
  })

})