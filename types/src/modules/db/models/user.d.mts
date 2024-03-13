export default class User extends TablePrototype {
    static tableName: string;
    static register({ name, email, password }: {
        name: any;
        email: any;
        password: any;
    }): Promise<any[]>;
    static login({ email, password }: {
        email: any;
        password: any;
    }): Promise<any>;
}
import { TablePrototype } from '../tablePrototype.mjs';
//# sourceMappingURL=user.d.mts.map