$(function () {
  const { form } = layui

  // 定义弹出层的id (索引)编号
  let index

  // 1. 从服务器获取文章列表数据, 并渲染到页面 (封装成一个函数)
  getCateList()

  function getCateList () {
    // 1.1 发送请求
    axios.get('/my/article/cates').then(res => {
      console.log(res)
      // 1.2 判断请求失败
      if (res.status !== 0) {
        return layer.msg('获取分类列表失败!')
      }

      // 1.4 请求成功 TODO
      // 使用模板引擎渲染页面: 1. 引入插件 2. 准备一个模板 3. 调用一个模板函数 template(id, 数据对象)
      const htmlStr = template('tpl', res)
      // console.log(htmlStr)

      // 1.5 把拼接好的 html 字符串渲染到 tbody 表格主体中
      $('tbody').html(htmlStr)
    })
  }

  // 2. 点击添加按钮, 添加一个文章分类
  $('.add-btn').click(function () {
    // 2.1 点完之后, 显示一个弹出层
    index = layer.open({
      type: 1, 
      // 弹出的标题
      title: '添加文章分类',
      // 弹出层的内容
      content: $('.add-form-container').html(),
      // 弹出层的宽高
      area: ['500px', '250px'] 
    })
  })

  // 3. 监听添加表单的提交事件
  // 坑: 注意这个表单点击之后再去添加的, 后创建的元素绑定事件统一使用 "事件委托"
  $(document).on('submit', '.add-form', function (e) {
    e.preventDefault()

    // 3.1 发送请求, 把表单数据提交到服务器
    axios.post('/my/article/addcates', $(this).serialize()).then(res => {
      console.log(res)
      // 3.2 判断失败
      if (res.status !== 0) {
        return layer.msg('提交失败!')
      }

      layer.msg('添加分类成功!')

      // 3.3 成功 TODO, 关闭弹出层, index 为定义弹出层位置的返回值 
      layer.close(index)

      // 3.4 更新外层分类表格数据, 重新调用方法渲染即可
      getCateList()
    })
  })

  // 4. 点击编辑按钮, 弹出编辑表单
  $(document).on('click', '.edit-btn', function () {
    // 4.1  点完之后, 显示一个弹出层
    index = layer.open({
      type: 1, 
      // 弹出的标题
      title: '修改文章分类',
      // 弹出层的内容
      content: $('.edit-form-container').html(),
      // 弹出层的宽高
      area: ['500px', '250px'] 
    })

    // 4.2 获取自定义属性的值
    console.log($(this).data('id'))
    const id = $(this).data('id')

    // 4.3 发送请求到服务器, 获取当前的分类数据
    axios.get(`/my/article/cates/${id}`).then(res => {
      console.log(res)

      if (res.status !== 0) {
        return layer.msg('获取失败!')
      }

      // 4.4 对编辑表单进行赋值
      form.val('edit-form', res.data)
    })

    
  })
  
  // 5. 监听编辑表单的提交事件
  $(document).on('submit', '.edit-form', function (e) {
    e.preventDefault()

    // 5.1  发送请求到服务器, 提交表单数据
    axios.post('/my/article/updatecate', $(this).serialize()).then(res => {
      console.log(res)
      // 5.3 判断失败
      if (res.status !== 0) {
        return layer.msg('更新失败!')
      }

      // 5.4 成功 TODO, 关闭弹出层, index 为定义弹出层位置的返回值 
      layer.close(index)

      // 5.5 更新外层分类表格数据, 重新调用方法渲染即可
      getCateList()
    })
  })

  // 6. 点击删除按钮, 删除当前这条分类
  $(document).on('click', '.del-btn', function () {
    // 获取自定义属性值
    const id = $(this).data('id')

    // 6.1 查文档, 显示询问类型的弹出层 [https://www.layui.com/doc/modules/layer.html#layer.confirm]
    
    layer.confirm('确认删除?', {icon: 3, title:'提示'}, function (index) { // 点击确定按钮的回调函数
      // 6.2 发送请求到服务器, 删除这条分类
      axios.get(`/my/article/deletecate/${id}`).then(res => {
        // 6.3 判断失败
        if (res.status !== 0) {
          return layer.msg('删除失败!')
        }
        // 6.4 提示成功
        layer.msg('删除成功!')

        // 6.5 重新渲染表格
        getCateList()
      })
      
      // 关闭弹出层
      layer.close(index)
    })


  })
})