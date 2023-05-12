const Koa = require('koa')

const bodyParser = require('koa-bodyparser')



// 注册
const userRouter = require('../router/user.router')
// 登录
const loginRouter = require('../router/login.router')

// 路由自动注册
const registerRouters = require('../router')

// 1.创建app
const app = new Koa()

app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.use(loginRouter.routes())
app.use(loginRouter.allowedMethods())

registerRouters(app)

// 3. app导出
module.exports = app