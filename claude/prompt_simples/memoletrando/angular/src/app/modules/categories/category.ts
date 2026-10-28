import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';
import { Theme } from '../themes/theme';

export class Category extends Serializable {

    override id: number | null = null;
    name: string | null = null;
    category_id: number | null = null;
    order: number | null = null;
    active: boolean = true;
    main: boolean = true;
    count_game_figures: string | null = null;
    theme: Theme | null = null;

    created_at: moment.Moment | null = null;
    updated_at: moment.Moment | null = null;
    deleted_at: moment.Moment | null = null;

    categories: Category[] = [];

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    override get relations() {
        return {
            categories: Category,
            theme: Theme
        }
    }

    override get dates() {
        return ['created_at', 'updated_at', 'deleted_at'];
    }

    override get http_data() {
        return {
            id: this.id,
            name: this.name,
            category_id: this.category_id,
            order: this.order,
            active: this.active,
            main: this.main
        };
    }
}
