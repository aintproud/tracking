import pino from 'pino'
const transport = pino.transport({
  targets: [
    {
      target: 'pino/file',
      options: {
        destination: `./logs/app.log`,
      },
    },
    {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
        colorize: true,
      },
    },
  ],
})
export const logger = pino(transport)

export default logger
