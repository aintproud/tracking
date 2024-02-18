import Ajv from 'ajv'
const ajv = new Ajv()

export function primaryValidation(message) {
  try {
    const json = JSON.parse(message)
    const valid = ajv.validate(
      {
        type: 'object',
        properties: {
          type: { type: 'string' },
          data: { type: 'object' },
        },
        required: ['type', 'data'],
        additionalProperties: false,
      },
      json
    )
    return !valid || json
  } catch (e) {
    return false
  }
}
export function createResponse(data, isError = false) {
  const response = {
    data,
    error: isError,
  }
  return JSON.stringify(response)
}
