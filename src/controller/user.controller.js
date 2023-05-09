const userService = require('../service/user.service')

class UserController {
  async create(ctx, next) {
    // 1.获取用户信息
    const user = ctx.request.body

    // 2. 用户名密码验证
    const { name, password } = user
    if(!name || !password) {
      ctx.body = {
        code: -1001,
        message: '用户名或者密码不能为空'
      }
      return
    }

    // 数据库是否存在该用户
    const users = await userService.findUserByName(name)
    if(users.length) {
      ctx.body = {
        code: -1002,
        message: '用户名已存在'
      }
      return
    }

    // 2.将信息存储到数据库中
    const result = await userService.create(user)

    // 3.查看存储的结果, 告知前端创建成功
    ctx.body = {
      message: '创建用户成功~',
      data: result
    }
  }
}

module.exports = new UserController()