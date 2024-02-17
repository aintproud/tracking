import config from '../../config.mjs'
import jwt from 'jsonwebtoken'

const { secret, exp } = config.jwt
export function createToken(payload) {
  return jwt.sign({ exp, ...payload }, secret)
}

export function verifyToken(payload) {
  const { exp, iat, ...body } = jwt.verify(payload, secret)
  return body
}
