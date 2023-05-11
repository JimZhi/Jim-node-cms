const userService = require('../service/user.service')

const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS } = require('../config/error')

const md5password = require('../utils/md5-password')

// 验证
const verifyUser = async (ctx, next) => {
  // 1.获取用户信息
  const user = ctx.request.body
  // 2. 用户名密码验证
  const { name, password } = user
  if(!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  // 数据库是否存在该用户
  const users = await userService.findUserByName(name)
  if(users.length) {
    return ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx)
  }

  // 3.执行下一个中间件
  await next()
}

// 密码加密
const handlePassword = async (ctx,  next) => {
  // 1.取出密码
  const { password } = ctx.request.body

  // 2.对密码进行加密
  ctx.request.body.password = md5password(password)

  // 3.执行下一个中间件
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}
