export default class GeoData extends TablePrototype {
    static tableName: string;
    static write({ longitude, latitude, user_id }: {
        longitude: any;
        latitude: any;
        user_id: any;
    }): Promise<any>;
}
import { TablePrototype } from '../tablePrototype.mjs';
//# sourceMappingURL=geodata.d.mts.map