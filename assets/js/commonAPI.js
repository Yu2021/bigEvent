// 为全局的 axios 请求设置根路径
axios.defaults.baseURL = 'http://ajax.frontend.itheima.net'

// 添加全局的请求拦截器
axios.interceptors.request.use(function (config) {
  console.log('----发送 ajax 请求前', config)
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加全局响应拦截器
axios.interceptors.response.use(function (response) {
  console.log('----接收 ajax 响应前', response)
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})