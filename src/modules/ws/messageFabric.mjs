import SomeHandler from './types/some.mjs'

export default class MessageFabric {
  constructor(json, connection) {
    this.json = json
    this.connection = connection
    const router = {
      some: SomeHandler,
    }
    const { type, data } = json
    const targetClass = router[type] ? router[type] : SomeHandler
    return new targetClass(data, connection)
  }
}