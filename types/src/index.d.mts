/// <reference types="node" />
export default app
declare const app: import('fastify').FastifyInstance<
	import('http').Server<
		typeof import('http').IncomingMessage,
		typeof import('http').ServerResponse
	>,
	import('http').IncomingMessage,
	import('http').ServerResponse<import('http').IncomingMessage>,
	import('fastify').FastifyBaseLogger,
	import('fastify').FastifyTypeProviderDefault
> &
	PromiseLike<
		import('fastify').FastifyInstance<
			import('http').Server<
				typeof import('http').IncomingMessage,
				typeof import('http').ServerResponse
			>,
			import('http').IncomingMessage,
			import('http').ServerResponse<import('http').IncomingMessage>,
			import('fastify').FastifyBaseLogger,
			import('fastify').FastifyTypeProviderDefault
		>
	>
//# sourceMappingURL=index.d.mts.map
