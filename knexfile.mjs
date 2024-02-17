import config from './config.mjs'

export default {
  client: 'postgresql',
  connection: config.db.url,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: 'data/migrations',
    extension: 'mjs',
    loadExtensions: ['.mjs']
  },
  seeds: {
    directory: 'data/seeds',
    extension: 'mjs',
    loadExtensions: ['.mjs']
  },
}
