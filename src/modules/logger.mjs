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
        ignore: 'pid,hostname',
        levelFirst: true,
        translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
        colorize: true,
      },
    },
  ],
})
export const logger = pino(transport)

export default logger
