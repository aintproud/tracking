import pino from 'pino'
import config from 'src/config.mjs'
const consoleTransport =
	config.type === 'PROD'
		? {
				target: 'pino/file',
			}
		: {
				target: 'pino-pretty',
				options: {
					levelFirst: true,
					colorize: true,
					translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
					ignore: 'pid,hostname',
				},
			}
const fileTransport = {
	target: 'pino/file',
	options: {
		destination: 'logs/tracker.log',
		mkdir: true,
		rotate: '7d',
	},
}
const transports = pino.transport({
	targets: [consoleTransport, fileTransport],
})
export const logger = pino(transports)

export default logger
