import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';
import { Theme } from '../themes/theme';

export class Category extends Serializable {

    id: number | null = null;
    name: string | null = null;
    category_id: number | null = null;
    order: number | null = 0;
    active: boolean = true;
    main: boolean = true;
    theme_id: number = null;

    created_at: moment.Moment | null = null;
    updated_at: moment.Moment | null = null;
    deleted_at: moment.Moment | null = null;

    categories: Category[] = [];
    theme: Theme = null;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    get relations() {
        return {
            categories: Category,
            theme: Theme
        }
    }

    get dates() {
        return ['created_at', 'updated_at', 'deleted_at'];
    }

    get http_data() {
        return {
            id: this.id,
            name: this.name,
            category_id: this.category_id,
            order: this.order,
            active: this.active,
            main: this.main,
            theme_id: this.theme_id
        };
    }
}
