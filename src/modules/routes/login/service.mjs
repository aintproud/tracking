import { verifyHash } from '../../utils.mjs'
import { createToken } from '../../jwt.mjs'
import User from '../../db/models/user.mjs'
export async function getLoginHandler(req, res) {
  const { email, password } = req.body
  const user = await User.table
    .select('*')
    .where({ email })
    .orWhere({ name: email })
    .first()
  if (!user) {
    res.status(401)
    throw new Error('Invalid credentials')
  }
  if (!(await verifyHash(password, user.password_hash))) {
    res.status(401)
    throw new Error('Invalid credentials')
  }
  const token = createToken(user)
  return { token }
}
