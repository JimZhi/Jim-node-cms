const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/screct')

class LoginController {
  sign(ctx, next) {
    const { id, name } = ctx.user

    // 2.颁发令牌token payload PRIVATE_KEY
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: 'RS256'
    })

    ctx.body = { code: 0, data: { id, name, token } }
  }

  test(ctx, next) {
    ctx.body = `验证身份通过~`
  }
}

module.exports = new LoginController()