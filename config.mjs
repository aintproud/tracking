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
    secret: 'secret',
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  },
}
