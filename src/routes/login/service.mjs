import User from 'src/modules/db/models/user.mjs'
import { createToken } from 'src/modules/jwt.mjs'
import { verifyHash } from 'src/modules/utils.mjs'

export default {
	post: async (req, res) => {
		const { email, password } = req.body
		const user = await User.find({ email })
		if (!user) {
			return res.status(401).send('Invalid credentials')
		}
		if (!(await verifyHash(password, user.password_hash))) {
			return res.status(401).send('Invalid credentials')
		}
		const token = createToken(user)
		return { token }
	},
}
