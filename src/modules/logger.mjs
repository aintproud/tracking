import pino from 'pino'
import config from '../../config.mjs'
const transport =
  config.type === 'PROD'
    ? null
    : {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname',
        },
      }
export const logger = pino({
  name: 'tracking',
  transport,
  formatters: {
    level: (label) => {
      return { level: label.toLocaleUpperCase() }
    },
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
})

export default logger
