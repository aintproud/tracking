import { getValidateSchema } from './schemas.mjs'
import { getValidateHandler } from './service.mjs'

export default async function (fastify) {
  fastify.get(
    '/:id/:token',
    {
      schema: getValidateSchema,
    },
    getValidateHandler
  )
}
