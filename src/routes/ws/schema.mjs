import RunTime from './websocket_logic/runtime.mjs'
import classes from './websocket_logic/classesLoader.mjs'
const wsApiDescription = {
  'message format': RunTime.primarySchema,
  'types schemas': Object.fromEntries(classes.map((c) => [c.type, c.schema])),
}
export default {
  summary: 'Websocket endpoint',
  description: '```\n' + JSON.stringify(wsApiDescription, null, '\t'),
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
