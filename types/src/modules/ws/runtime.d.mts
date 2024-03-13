export default class Runtime {
    constructor(classes: any);
    classes: any;
    primarySchema: {
        type: string;
        properties: {
            type: {
                type: string;
            };
            data: {
                type: string;
            };
        };
        required: string[];
        additionalProperties: boolean;
    };
    get docs(): string;
    get errors(): {
        primaryValidation: {
            description: string;
            schema: {
                type: string;
                properties: {
                    type: {
                        type: string;
                    };
                    data: {
                        type: string;
                    };
                };
                required: string[];
                additionalProperties: boolean;
            };
            recieved: any;
        };
        wrongType: {
            description: string;
            proposes: any;
        };
    };
    primaryValidation(message: any): any;
    getTargetClass(): any;
    run(message: any, context: any, connection: any): any;
    json: any;
}
//# sourceMappingURL=runtime.d.mts.map