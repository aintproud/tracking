export default class RunTime {
	static primarySchema: {
		type: string
		properties: {
			type: {
				type: string
			}
			data: {
				type: string
			}
		}
		required: string[]
		additionalProperties: boolean
	}
	constructor(message: any, context: any, connecion: any)
	context: any
	connecion: any
	message: any
	get errors(): {
		primaryValidation: {
			description: string
			schema: any
			recieved: any
		}
		wrongType: {
			description: string
			proposes: any[]
		}
	}
	primaryValidation(): any
	getHandler(): any
	run(): any
	json: any
}
//# sourceMappingURL=runtime.d.mts.map
