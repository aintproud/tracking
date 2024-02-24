import runtime from './runtime.mjs'

export default {
  summary: 'Websocket endpoint',
  description: runtime.docs,
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
