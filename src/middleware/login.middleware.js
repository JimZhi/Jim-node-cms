const jwt = require('jsonwebtoken')

const { 
  NAME_OR_PASSWORD_IS_REQUIRED, 
  NAME_IS_NOT_EXISTS, 
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION
} = require('../config/error')

const { PUBLIC_KEY } = require('../config/screct')

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

const verifyAuth = async (ctx, next) => {
  // 获取token
  const authorization = ctx.headers.authorization

  if (!authorization) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }

  const token = authorization.replace('Bearer ', '')

  // 验证token是否有效
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })

    // 2.将token的信息保留下来
    ctx.user = result

    // 3.执行下一个中间件
    await next()

  } catch (error) {
    ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}