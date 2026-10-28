import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';

export class Image extends Serializable {

    override id: null | number = null;
    path: null | string = null;
    path_src: null | string = null;
    category: null | string = null;
    order: null | number = null;
    imageable_id: null | number = null;
    imageable_type: null | number = null;
    save_type: null | number = null;
    created_at: null | moment.Moment = null;
    updated_at: null | moment.Moment = null;
    deleted_at: null | moment.Moment = null;

    base64: null | string = null;
    imageChangedEvent: null | any = null;
    croppedImage: null | any = null;

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
