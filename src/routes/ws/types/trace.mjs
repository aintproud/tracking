import GeoData from 'src/modules/db/models/geodata.mjs'
import HandlerPrototype from '../handlerPrototype.mjs'
import db from 'src/modules/db/db.mjs'

export default class TraceHandler extends HandlerPrototype {
  constructor(data, context, connection) {
    super(data, connection)
    this.context = context
    this.schema = {
      type: 'object',
      properties: {
        latitude: {
          type: 'number',
          minimum: -90,
          maximum: 90,
        },
        longitude: {
          type: 'number',
          minimum: -180,
          maximum: 180,
        },
      },
      required: ['latitude', 'longitude'],
    }
  }
  async handle() {
    const { latitude, longitude } = this.data
    const res = await GeoData.insert({
      geometry: db.raw(`point(${longitude}, ${latitude})`),
      user_id: this.context.body.id,
    })
    console.log(res);
    this.connection.socket.send(`success: ${JSON.stringify(res)}`)
  }
}
