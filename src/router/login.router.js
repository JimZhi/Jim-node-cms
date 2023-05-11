const KoaRouter = require('@koa/router')

const { sign } = require('../controller/login.controller')

// 登录帐号密码验证
const { verifyLogin } = require('../middleware/login.middleware')

// 1.创建路由对象
const loginRouter = new KoaRouter({ prefix: '/login' })
// 1. 判断帐号密码是否为空
// 2. 用户是否存在于数据库中
// 3. 该用户名与密码是否一致
// 4. 颁发令牌token
loginRouter.post('/', verifyLogin, sign)

module.exports = loginRouter