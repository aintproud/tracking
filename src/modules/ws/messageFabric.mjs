import SomeHandler from './types/some.mjs'

export default class MessageFabric {
  constructor({ type, data }, connection) {
    const router = {
      some: SomeHandler,
    }
    const targetClass = router[type] || SomeHandler
    return new targetClass(data, connection)
  }
}