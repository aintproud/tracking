import User from "src/modules/db/models/user.mjs"
import { createToken } from "src/modules/jwt.mjs"
import { verifyHash } from "src/modules/utils.mjs"

/**
 * Retrieves the user from the database based on the provided email or name, and verifies the password for login.
 *
 * @param {import('fastify').FastifyRequest} req - The Fastify request object
 * @param {import('fastify').FastifyReply} res - The Fastify reply object
 * @return {Object} An object containing the authentication token
 */
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
