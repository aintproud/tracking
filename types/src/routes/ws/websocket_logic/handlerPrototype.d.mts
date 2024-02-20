export default class HandlerPrototype {
    static get type(): void;
    static get schema(): void;
    constructor(data: any, context: any, connection: any);
    data: any;
    context: any;
    connection: any;
    get errors(): {
        validation: {
            description: string;
            schema: any;
            recieved: any;
        };
    };
    validate(): boolean;
}
//# sourceMappingURL=handlerPrototype.d.mts.map