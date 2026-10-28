import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';
import { Category } from '../categories/category';
import { Image } from '../images/image';

export class Theme extends Serializable {

    override id: number | null = null;
    name: string | null = null;
    order: number | null = null;
    active: boolean = true;
    
    created_at: moment.Moment | null = null;
    updated_at: moment.Moment | null = null;
    deleted_at: moment.Moment | null = null;
    
    categories: Category[] = [];
    image: Image = new Image;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    override get relations() {
        return {
            categories: Category,
            image: Image
        }
    }

    override get dates() {
        return ['created_at', 'updated_at', 'deleted_at'];
    }

    override get http_data() {
        return {
            id: this.id,
            name: this.name,
            order: this.order,
            active: this.active
        };
    }
}
