const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_NOT_EXISTS, PASSWORD_IS_INCORRENT } = require('../config/error')

const userService = require('../service/user.service')

const md5password = require('../utils/md5-password')

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 1.判断用户名和密码是否为空
  if(!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  // 2. 查询数据库判断用户是否存在
  const users = await userService.findUserByName(name)
  const user = users[0]
  if (!user) {
    return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx)
  }

  // 3.查询数据库中密码和用户传递的密码是否一致
  if (user.password !== md5password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRENT, ctx)
  }

  // 4.将user对象保存在ctx,需要把查询到的信息返回给客户端
  ctx.user = user

  await next()
}

module.exports = {
  verifyLogin
}