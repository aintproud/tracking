import { verifyRoles } from '../../guards.mjs'
import { asyncStorageBinding } from '../../middlewares.mjs'

import { postLoginSchema } from './schemas.mjs'
import { getLoginHandler } from './service.mjs'

export default async function (fastify) {
  fastify.post(
    '/',
    {
      schema: postLoginSchema,
      preHandler: [asyncStorageBinding, await verifyRoles(['admin'])],
    },
    getLoginHandler
  )
}
