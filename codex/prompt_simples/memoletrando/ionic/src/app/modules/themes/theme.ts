import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';
import { Image } from '../images/image';

export class Theme extends Serializable {

    id: number = null;
    name: string = null;
    order: number = 0;
    active: boolean = true;

    created_at: moment.Moment = null;
    updated_at: moment.Moment = null;
    deleted_at: moment.Moment = null;

    image: Image = new Image;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    get relations() {
        return {
            image: Image,
        }
    }

    get dates() {
        return ['created_at', 'updated_at', 'deleted_at'];
    }

    get http_data() {
        return {
            name: this.name,
            order: this.order,
            image: this.image,
            active: this.active,
        }
    }

}
