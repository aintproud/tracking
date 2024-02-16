export class OperationalError extends Error {
  constructor(commonType, description, isOperational) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    this.commonType = commonType
    this.isOperational = isOperational
    Error.captureStackTrace(this)
  }
}

export const ERROR_TYPES = {
  InputError: 'InputError',
  EmailError: 'EmailError',
}