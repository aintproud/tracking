export namespace postLoginSchema {
	let summary: string
	namespace body {
		let type: string
		namespace properties {
			namespace email {
				let type_1: string
				export { type_1 as type }
				export let format: string
			}
			namespace password {
				let type_2: string
				export { type_2 as type }
			}
		}
		let required: string[]
		let additionalProperties: boolean
	}
	let response: {
		200: {
			type: string
			properties: {
				token: {
					type: string
				}
			}
			required: string[]
			additionalProperties: boolean
		}
		401: {
			type: string
			properties: {
				error: {
					type: string
				}
			}
			required: string[]
			additionalProperties: boolean
		}
	}
}
//# sourceMappingURL=schemas.d.mts.map
