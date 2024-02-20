import Validation_token from 'src/modules/db/models/validation_token.mjs'
export async function getValidateHandler(req, res) {
  const params = req.params
  const verification = await Validation_token.find({ user_id: params.id })
  if (!verification) {
    res.status(404)
    return { message: 'Verification not found' }
  }
  if (verification.token !== params.token) {
    res.status(403)
    return { message: 'Invalid token' }
  }
  await Validation_token.table.where({ user_id: params.id }).del()
  return { message: 'Email verified' }
}
