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
    const context = asyncLocalStorage.getStore()
    context.body = body
    console.log(context);
  } catch (error) {
    return 'invalid json'
  }
}