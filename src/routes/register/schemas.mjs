export default {
	post: {
		summary: 'Register a new user',
		body: {
			type: 'object',
			properties: {
				name: { type: 'string' },
				email: { type: 'string', format: 'email' },
				password: { type: 'string' },
			},
			required: ['email', 'password', 'name'],
			additionalProperties: false,
		},
		response: {
			200: {
				type: 'object',
				properties: {
					token: { type: 'string' },
				},
				required: ['token'],
				additionalProperties: false,
			},
			409: {
				type: 'object',
				properties: {
					error: { type: 'string' },
				},
				required: ['error'],
				additionalProperties: false,
			},
		},
	},
}
