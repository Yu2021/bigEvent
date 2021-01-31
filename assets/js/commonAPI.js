// 为全局的 axios 请求设置根路径
axios.defaults.baseURL = 'http://api-breakingnews-web.itheima.net'

// 添加全局的请求拦截器
axios.interceptors.request.use(function (config) {
  // console.log('----发送 ajax 请求前', config)

  // console.log(config.url)
  // 获取本地存储的 token 令牌
  const token = localStorage.getItem('token') || ''

  // 在发送请求之前判断是否有 /my 开头的请求路径
  // 如果有, 手动添加 headers 请求头
  /* 
    (1) startsWith
    (2) 正则表达式 /^\/my/.test()
    (3) indexOf('/my') == 0
  */
  if (config.url.indexOf('/my') == 0) {
    config.headers.Authorization = token
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加全局响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log('----接收 ajax 响应前', response)

  const { message, status } = response.data
  // 先判断身份验证是否失败
  if (message == '身份认证失败！' && status == 1) {
    // 清除本地存储的 token
    localStorage.removeItem('token')
    // localStorage.setItem('token', '')
    // 跳转到登录页
    location.href = './login.html'
  }

  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})