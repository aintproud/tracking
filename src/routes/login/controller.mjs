import logger from 'src/modules/logger.mjs'
import schemas from './schemas.mjs'
import service from './service.mjs'

/**  @type {import('fastify').FastifyPluginAsync<>} */
export default async function (fastify) {
	fastify.post('/', { schema: schemas.post }, service.post)
}