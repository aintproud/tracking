import { postRegisterSchema } from './schemas.mjs'
import { postRegisterHandler } from './service.mjs'

/**  @type {import('fastify').FastifyPluginAsync<>} */
export default async function (fastify) {
  fastify.post(
    '/',
    {
      schema: postRegisterSchema,
    },
    postRegisterHandler
  )
}
