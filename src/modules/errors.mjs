export default class OperationalError extends Error {
	constructor(description, httpCode = 500) {
		super(description)
		Object.setPrototypeOf(this, new.target.prototype)
		this.httpCode = httpCode
		Error.captureStackTrace(this)
	}
}
