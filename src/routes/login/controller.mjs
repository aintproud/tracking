import { postLoginSchema } from './schemas.mjs'
import { getLoginHandler } from './service.mjs'

/**  @type {import('fastify').FastifyPluginAsync<>} */
export default async function (fastify) {
  fastify.post(
    '/',
    {
      schema: postLoginSchema,
    },
    getLoginHandler
  )
}
