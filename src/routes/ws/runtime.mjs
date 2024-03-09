import Runtime from 'src/modules/ws/runtime.mjs'
import { readdirSync } from 'node:fs'
import logger from 'src/modules/logger.mjs'
import HandlerPrototype from 'src/modules/ws/handlerPrototype.mjs'
const folder = 'classes'
const files = readdirSync(`${import.meta.dirname}/${folder}`)
const filteredFiles = files.filter((file) => file.endsWith('.mjs'))

const classes = (
	await Promise.all(filteredFiles.map((file) => import(`./${folder}/${file}`)))
).map((r) => {
	if (!r.default || !(Object.getPrototypeOf(r.default) === HandlerPrototype))
		throw new Error(
			'File must export default a handler class extends HandlerPrototype',
		)
	const { type, schema } = r.default
	logger.info({ message: 'loaded ws message handler class', type, schema })
	return r.default
})

export default new Runtime(classes)
