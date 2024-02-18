export default {
  summary: 'Websocket endpoint',
  description: `
   message format:
   {
      type: 'string',
      data: {
        type: 'object'
      }
   }

   data types:
    - some (key: string)
    - trace (latitude: number, longitude: number)
  `,
  headers: {
    type: 'object',
    properties: {
      authorization: { type: 'string' },
    },
    required: ['authorization'],
  },
  response: {
    401: {},
  },
}
