import { postLoginSchema } from './schemas.mjs'
import { getLoginHandler } from './service.mjs'

export default async function (fastify) {
  fastify.post(
    '/',
    {
      schema: postLoginSchema,
    },
    getLoginHandler
  )
}
