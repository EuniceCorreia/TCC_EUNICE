import { Serializable } from 'src/app/base/serializable';
import { PermissionCategory } from './permission-category';

export class Permission extends Serializable {

    public id: number = null;
    public name: string = null;
    public type: string = null;
    public pivot: any = { allow: false };
    public category: PermissionCategory = null;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    get relations() {
        return {
            category: PermissionCategory,
        };
    }

    get http_data() {
        return {
            id: this.id,
            pivot: {
                allow: this.pivot.allow
            },
        };
    }
}
