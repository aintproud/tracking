import jwt from 'jsonwebtoken'
import config from 'src/config.mjs'

const { secret, exp } = config.jwt
export function createToken(payload) {
  return jwt.sign({ exp, ...payload }, secret)
}

export function verifyToken(payload) {
  const { exp, iat, ...body } = jwt.verify(payload, secret)
  return body
}
