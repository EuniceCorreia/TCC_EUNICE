import { Serializable } from 'src/app/base/serializable';
import { Permission } from './permission';

export class PermissionCategory extends Serializable {

    public override id: number | null = null;
    public name: string | null = null;
    public type: string | null = null;
    public permissions: any = [];

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    override get relations() {
        return {
        };
    }
}
