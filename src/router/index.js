const fs = require('fs')
function registerRouters(app) {

  const files = fs.readdirSync(__dirname)

  for(const file of files) {
    if (!file.endsWith('.router.js')) continue

    const router = require(`./${file}`)
    
    app.use(router.routes())
    app.use(router.allowedMethods())
  }


  // app.use(userRouter.routes())
  // app.use(userRouter.allowedMethods())
}

module.exports = registerRouters