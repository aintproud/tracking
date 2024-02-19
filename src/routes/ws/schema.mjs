import RunTime from './websocket_logic/runtime.mjs'
import classes from './websocket_logic/classesLoader.mjs'
export default {
  summary: 'Websocket endpoint',
  description: `
  ***Message format***
  ${'```\n'}${JSON.stringify(RunTime.primarySchema, null, '\t')}${'\n```'}

  ***Types schemas***
  ${'```\n'}${JSON.stringify(
    Object.fromEntries(classes.map((c) => [c.type, c.schema])),
    null,
    '\t'
  )}
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
