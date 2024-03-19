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
		secret: 'test_sercret',
		daysToExpire: 7,
	},
}
