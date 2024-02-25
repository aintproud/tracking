import jwt from 'jsonwebtoken'
import config from 'src/config.mjs'

const { secret, daysToExpire } = config.jwt
export function createToken(payload) {
	return jwt.sign(payload, secret, { expiresIn: `${daysToExpire}d` })
}

export function verifyToken(payload) {
	const { exp, iat, ...body } = jwt.verify(payload, secret)
	return body
}
