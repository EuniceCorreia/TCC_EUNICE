import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';

export class Level extends Serializable {

    override id: number | null = null;
    name: string | null = null;
    quantity_images: number = 2;

    created_at: moment.Moment | null = null;
    updated_at: moment.Moment | null = null;
    deleted_at: moment.Moment | null = null;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    override get relations() {
        return {
        }
    }

    override get dates() {
        return ['created_at', 'updated_at', 'deleted_at'];
    }

    override get http_data() {
        return {
            name: this.name,
            quantity_images: this.quantity_images
        };
    }
}
