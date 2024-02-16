import fastify from 'fastify'
const app = fastify()

app.register(import('@fastify/websocket'))
app.register(import('./modules/ws/controller.mjs'))

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at: ${address}`)
})
export default app
