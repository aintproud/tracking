import app from '@src/index.mjs'
import supertest from 'supertest'
test('GET /', async () => {
	await app.ready()
	const response = await supertest(app.server).get('/')
	expect(response.statusCode).toBe(404)
})
