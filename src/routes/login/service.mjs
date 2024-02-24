import User from 'src/modules/db/models/user.mjs'
import { createToken } from 'src/modules/jwt.mjs'
import { verifyHash } from 'src/modules/utils.mjs'

export default {
  post: async (req, res) => {
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
  },
}
