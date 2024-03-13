export default class SomeHandler extends HandlerPrototype {
    static type: string;
    static schema: {
        type: string;
        properties: {
            key: {
                type: string;
            };
        };
        required: string[];
        additionalProperties: boolean;
    };
    constructor(data: any, context: any, connection: any);
    handle(): void;
}
import HandlerPrototype from 'src/modules/ws/handlerPrototype.mjs';
//# sourceMappingURL=some.d.mts.map