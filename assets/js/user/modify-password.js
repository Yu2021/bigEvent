/* 修改密码模块 */
$(function () {
  // 从 layui 中提取模块
  const { form, layer } = layui

  // 1. 表单校验
  form.verify({
    pass: [
      /^\w{6,12}$/,
      '密码必须6到12位，且不能出现空格'
    ],
    confirmPass: function (val) { // val 当前的表单值
      if (val !== $('#pass').val()) {
        return '两次密码输入不一致'
      }
    }
  })

  // 2. 表单提交
  $('.layui-form').submit(function (e) {
    e.preventDefault()

    // 发起 ajax 请求
    axios.post('/my/updatepwd', $(this).serialize())
         .then(res => {
            console.log(res)
            // 校验请求失败  
            if (res.status !== 0) {
              return layer.msg('修改密码失败!')
            }
            // 提示用户
            layer.msg('修改密码成功!')
         })
  })

})