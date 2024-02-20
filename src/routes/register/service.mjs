import User from '../../modules/db/models/user.mjs'
import { createToken } from 'src/modules/jwt.mjs'
import { createHash } from 'src/modules/utils.mjs'
import Validation_token from '../../modules/db/models/validation_token.mjs'
import { randomBytes } from 'node:crypto'
import { sendVerificationEmail } from '../../modules/email.mjs'

export async function postRegisterHandler(req, res) {
  const { name, email, password } = req.body
  const password_hash = await createHash(password)
  let user = await User.table.where({ email }).orWhere({ name }).first()
  const verificationSend = user? await Validation_token.find({ user_id: user.id }) : false
  if (verificationSend) {
    res.status(403)
    return { message: 'Email verification is required to obtain a token' }
  }
  if (user) {
    res.status(409)
    return { error: 'User already exists' }
  }
  user = await User.insert({ name, email, password_hash })
  const validation = await Validation_token.insert({ user_id: user.id, token: randomBytes(32).toString('hex') })
  await sendVerificationEmail(email, user.id, validation.token)
  return { message: 'Email verification send' }
}
