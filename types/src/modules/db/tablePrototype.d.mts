export class TablePrototype {
    static schema: any;
    static tableName: any;
    static get table(): import("knex").Knex.QueryBuilder<any, {
        _base: any;
        _hasSelection: false;
        _keys: never;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    }[]>;
    static insert(data: any): Promise<any>;
    static find(object: any): Promise<any>;
    static delete(object: any): Promise<number>;
    static update(object: any, data: any): Promise<number>;
    static findAll(object: any): Promise<any[]>;
}
//# sourceMappingURL=tablePrototype.d.mts.map