import pino from 'pino'

export const logger = pino({
  formatters: {
    level: (label) => {
      return { level: label.toLocaleUpperCase() }
    },
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
})

export default logger
