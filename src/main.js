const app = require('./app')

const { SERVER_PORT } = require('./config/server')

// 引入错误处理监听
require('./utils/handle-error')

app.listen(SERVER_PORT, () => {
  console.log('服务器启动成功~')
})