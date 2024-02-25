export default {
	post: {
		summary: 'Login a user',
		body: {
			type: 'object',
			properties: {
				email: { type: 'string', format: 'email' },
				password: { type: 'string' },
			},
			required: ['email', 'password'],
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
			401: {
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
