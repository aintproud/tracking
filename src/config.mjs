import { randomBytes } from 'node:crypto'
const { TYPE } = process.env

export default {
  port: 3000,
  type: TYPE,
  db: {
    url:
      TYPE === 'PROD'
        ? 'postgresql://user:password@localhost:5432/postgres'
        : 'postgresql://user:password@localhost:5432/postgres',
  },
  jwt: {
    secret: TYPE === 'PROD' ? randomBytes(64) : 'test_sercret',
    daysToExpire: 7,
  },
}
