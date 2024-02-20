export default class TraceHandler extends HandlerPrototype {
    static type: string;
    static schema: {
        type: string;
        properties: {
            latitude: {
                type: string;
                minimum: number;
                maximum: number;
            };
            longitude: {
                type: string;
                minimum: number;
                maximum: number;
            };
        };
        required: string[];
        additionalProperties: boolean;
    };
    handle(): Promise<any>;
}
import HandlerPrototype from '../handlerPrototype.mjs';
//# sourceMappingURL=trace.d.mts.map