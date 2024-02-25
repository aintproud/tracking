import asyncLocalStorage from './async.mjs'
import { verifyToken } from './jwt.mjs'

export async function verifyRoles(roles) {
	return async (req, res) => {
		const session = asyncLocalStorage.getStore()
		console.log(session)
	}
}

export async function jwtGuard(req, res) {
	try {
		const body = verifyToken(req.headers.authorization)
		if (!body.id) return res.status(401).send('jwt payload error')
		const context = asyncLocalStorage.getStore()
		context.body = body
	} catch (error) {
		return res.status(401).send('jwt verify error')
	}
}
