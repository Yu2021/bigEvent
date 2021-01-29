/* 基本资料功能 */
$(function () {

  const { layer, form } = layui

  // 1. 页面一加载获取用户信息
  function initUserInfo () {
    axios.get('/my/userinfo').then(res => {
      // 校验请求失败
      if (res.status !== 0) {
        return layer.msg('获取失败!')
      }
      const { data } = res
      // 给表单赋值
      // 注意: edit-userinfo 是表单 lay-filter 属性的值
      //       data 对象中的属性名和表单 name 值一一对应
      form.val('edit-userinfo', data)
    })
  }

  initUserInfo()

  // 2. 表单验证
  form.verify({
    nick: [
      /^\S{1,6}$/,
      '昵称长度必须在 1 ~ 6 个字符之间'
    ]
  })

  // 3. 提交修改
  $('.base-info-form').submit(function (e) {
    e.preventDefault()

    // 发送 ajax 请求
    axios.post('/my/userinfo', $(this).serialize())
         .then(res => {
            console.log(res)
            // 校验失败
            if (res.status !== 0) {
              return layer.msg('修改信息失败!')
            }
            // 提示用户
            layer.msg('修改信息成功!')
            // 更新用户信息
            // console.log(window.parent.document.querySelector('.nickname'))
            window.parent.getUserInfo()
         })
  })

  // 4. 重置功能
  $('#reset-btn').click(function (e) {
    e.preventDefault()
    // 重新渲染用户信息
    initUserInfo()
  })
})