export const getValidateSchema = {
  summary: 'Validate email',
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      token: { type: 'string' },
    },
    required: ['id', 'token'],
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
    }
  },
}
