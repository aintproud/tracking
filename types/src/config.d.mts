declare namespace _default {
    export let port: number;
    export { TYPE as type };
    export namespace db {
        let url: string;
    }
    export namespace jwt {
        let secret: string | Buffer;
        let daysToExpire: number;
    }
    export namespace email {
        let host: string;
        namespace auth {
            let user: string;
            let pass: string;
        }
    }
}
export default _default;
declare const TYPE: string;
//# sourceMappingURL=config.d.mts.map