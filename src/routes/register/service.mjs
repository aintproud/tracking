import User from 'src/modules/db/models/user.mjs'
import OperationalError from 'src/modules/errors.mjs'
import { createToken } from 'src/modules/jwt.mjs'
import logger from 'src/modules/logger.mjs'

export default {
	post: async (req, res) => {
		try {
			const { name, email, password } = req.body
			const user = await User.register({ name, email, password })
			return { token: createToken({ id: user.id }) }
		} catch (error) {
			if (error instanceof OperationalError) {
				logger.error(error)
				return res.status(error.httpCode).send(error.message)
			}
		}
	},
}
