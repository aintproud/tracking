import Ajv from "ajv"
const ajv = new Ajv()

class SomeHandler {
  constructor(connection) {
    this.connection = connection
  }

  handle() {
    this.connection.socket.send('success')
  }
}


const router = {
  'some': SomeHandler,
}
export default class MessageFabric {
  constructor(message, connection){
    this.message = message
    this.connection = connection
    this.schema = {
      type: 'object',
      properties: {
        type: { type: 'string' },
        data: { type: 'object' },
      },
      required: ['key'],
      additionalProperties: false,
    }
    this.tryJson()
    this.validate()
    const type = message.type
    const targetClass = router[type]? router[type] : SomeHandler
    return new targetClass(connection)
  }
  tryJson(){
    try{
      this.json = JSON.parse(this.message)
      console.log(this.json);
    } catch (e) {
      this.connection.socket.send('invalid json')
    }
  }
  validate(){
    const valid = ajv.validate(this.schema, this.message)
    if(!valid) {
      this.connection.socket.send('invalid json')
    }
    return valid
  }
}