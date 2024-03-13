export default class HandlerPrototype {
    static get type(): void;
    static get schema(): void;
    /** @param {import('@fastify/websocket').SocketStream} connection */
    constructor(data: any, context: any, connection: import('@fastify/websocket').SocketStream);
    data: any;
    context: any;
    connection: import("@fastify/websocket").SocketStream;
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