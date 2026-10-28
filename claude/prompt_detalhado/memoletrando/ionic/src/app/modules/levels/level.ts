import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';

export class Level extends Serializable {

    id: number | null = null;
    name: string | null = null;

    created_at: moment.Moment | null = null;
    updated_at: moment.Moment | null = null;
    deleted_at: moment.Moment | null = null;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    get relations() {
        return {
        }
    }

    get dates() {
        return ['created_at', 'updated_at', 'deleted_at'];
    }

    get http_data() {
        return {
            name: this.name,
        };
    }
}
