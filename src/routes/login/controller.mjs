import logger from 'src/modules/logger.mjs'
import schemas from './schemas.mjs'
import service from './service.mjs'

/**  @type {import('fastify').FastifyPluginAsync<>} */
export default async function (fastify) {
	fastify.post('/', { schema: schemas.post }, async (req, res) => {
		try {
			return await service.post(req, res)
		} catch (error) {
			logger.error(error)
			return res.status(500)
		}
	})
}
