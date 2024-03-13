import User from 'src/modules/db/models/user.mjs'
import { createToken } from 'src/modules/jwt.mjs'

export default {
	post: async (req, res) => {
		const { email, password } = req.body
		const user = await User.login({ email, password })
		return { token: createToken({ id: user.id }) }
	},
}
