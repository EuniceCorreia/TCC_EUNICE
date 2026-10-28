import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';
import { Category } from '../categories/category';
import { User } from '../account/users/user';
import { Level } from '../levels/level';

export class GameSetting extends Serializable {

    override id: number | null = null;
    quantity_images: number = 2;
    category_id: number | null = null;
    level_id: number | null = null;
    user_id: number | null = null;

    created_at: moment.Moment | null = null;
    updated_at: moment.Moment | null = null;
    deleted_at: moment.Moment | null = null;

    category: Category | null = null;
    level: Level | null = null;
    user: User | null = null;
    
    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    override get relations() {
        return {
            category: Category,
            level: Level,
            user: User
        }
    }

    override get dates() {
        return ['created_at', 'updated_at', 'deleted_at'];
    }

    override get http_data() {
        return {
            id: this.id,
            quantity_images: this.quantity_images,
            category_id: this.category_id,
            level_id: this.level_id,
            user_id: this.user_id,
        };
    }
}
