import { Serializable } from 'src/app/base/serializable';
import { PermissionCategory } from './permission-category';

export class Permission extends Serializable {

    public override id: number | null = null;
    public name: string | null = null;
    public type: string | null = null;
    public pivot: any = { allow: false };
    public category: PermissionCategory | null = null;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    override get relations() {
        return {
            category: PermissionCategory,
        };
    }

    override get http_data() {
        return {
            id: this.id,
            pivot: {
                allow: this.pivot.allow
            },
        };
    }
}
