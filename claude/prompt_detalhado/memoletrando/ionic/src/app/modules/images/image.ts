import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';

export class Image extends Serializable {

    id: number = null;
    path: string = null;
    path_src: string = null;
    category: string = null;
    order: number = null;
    imageable_id: number = null;
    imageable_type: number = null;
    save_type: number = null;
    created_at: moment.Moment = null;
    updated_at: moment.Moment = null;
    deleted_at: moment.Moment = null;

    base64: string = null;
    imageChangedEvent: any = null;
    croppedImage: any = null;

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
            id: this.id,
            path: this.path,
            path_src: this.path_src,
            category: this.category,
            order: this.order,
            imageable_id: this.imageable_id,
            imageable_type: this.imageable_type,
            base64: this.base64,
        }
    }

}
