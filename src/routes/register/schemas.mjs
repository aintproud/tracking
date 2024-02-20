export const postRegisterSchema = {
  summary: 'Register a new user',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
    },
    required: ['email', 'password', 'name'],
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
      additionalProperties: false,
    },
    403: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
      additionalProperties: false,
    },
    409: {
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
      required: ['error'],
      additionalProperties: false,
    },
  },
}
