const KoaRouter = require('@koa/router')

const userController = require('../controller/user.controller')
// const { verifyUser, handlePassword } = require('../middleware/user.middleware')

// 1.创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

// 2.定义路由中映射
// 2.1.用户注册接口
// userRouter.post('/', (ctx, next) => {
//   const user = ctx.request.body
//   console.log(user)
//   ctx.body = "创建成功"
// })

userRouter.post('/', userController.create)


// 3.导出路由
module.exports = userRouter
