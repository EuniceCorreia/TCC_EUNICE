import { Serializable } from 'src/app/base/serializable';
import { Permission } from './permission';

export class PermissionCategory extends Serializable {

    public id: number = null;
    public name: string = null;
    public type: string = null;
    public permissions: any = [];

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    get relations() {
        return {
        };
    }
}
