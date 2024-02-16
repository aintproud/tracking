const { TYPE } = process.env

export default {
    host: '0.0.0.0',
    port: 3000,
    type: TYPE,
    aws: {},
    redis: {},
    db: {},
    clickhouse: {},
    email: {}
}