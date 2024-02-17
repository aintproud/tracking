export const postRegisterSchema = {
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
}
