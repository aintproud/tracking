import { createHash } from '../../utils.mjs'
import User from '../../db/models/user.mjs'
import { createToken } from '../../jwt.mjs'
export async function postRegisterHandler(req, res) {
  const { name, email, password } = req.body
  const password_hash = await createHash(password)
  const exists = await User.table.where({ email }).orWhere({ name })
  if (exists.length > 0) {
    res.status(409)
    throw new Error('User already exists')
  }
  const result = await User.insert({ name, email, password_hash })
  return { token: createToken(result) }
}
