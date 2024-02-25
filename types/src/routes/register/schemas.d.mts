export namespace postRegisterSchema {
	let summary: string
	namespace body {
		let type: string
		namespace properties {
			namespace name {
				let type_1: string
				export { type_1 as type }
			}
			namespace email {
				let type_2: string
				export { type_2 as type }
				export let format: string
			}
			namespace password {
				let type_3: string
				export { type_3 as type }
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
		409: {
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
