const Koa = require('koa')

const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user.router')

// 1.创建app
const app = new Koa()

app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

// 3. app导出
module.exports = app