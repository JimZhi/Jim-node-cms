const KoaRouter = require('@koa/router')

const { verifyAuth } = require('../middleware/login.middleware')

const { create, list, detail, remove, update } = require('../controller/moment.controller')

const momentRouter = new KoaRouter({ prefix: '/moment' })

// 增
// 登录后才能发布动态
momentRouter.post('/', verifyAuth, create)

// 查
momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)


// 3.删: 删除动态
momentRouter.delete('/:momentId', verifyAuth, remove)
// 4.改: 修改动态
// 验证: 登录的用户才能修改动态
momentRouter.patch('/:momentId', verifyAuth, update)

module.exports = momentRouter