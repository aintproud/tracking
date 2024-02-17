import { postRegisterSchema } from './schemas.mjs'
import { postRegisterHandler } from './service.mjs'

export default async function (fastify) {
  fastify.post(
    '/',
    {
      schema: postRegisterSchema,
    },
    postRegisterHandler
  )
}
