import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';
import { Image } from '../images/image';
import { Level } from '../levels/level';
import { User } from '../account/users/user';
import { Category } from '../categories/category';
import { Theme } from '../themes/theme';

export class GameFigure extends Serializable {

    override id: number | null = null;
    name: string | null = null;
    description: string | null = null;
    active: boolean = true;
    level_id: number | null = null;
    category_id: number | null = null;
    user_id: number | null = null;

    //  aux
    theme_id: number | null = null;
    
    created_at: moment.Moment | null = null;
    updated_at: moment.Moment | null = null;
    deleted_at: moment.Moment | null = null;

    image: Image = new Image;
    level: Level | null = null;
    category: Category | null = null;
    user: User | null = null;
    theme: Theme | null = null;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    override get relations() {
        return {
            image: Image,
            level: Level,
            category: Category,
            user: User,
            theme: Theme
        }
    }

    override get dates() {
        return ['created_at', 'updated_at', 'deleted_at'];
    }

    override get http_data() {
        return {
            name: this.name,
            description: this.description,
            active: this.active,
            level_id: this.level_id,
            category_id: this.category_id,
            user_id: this.user_id,
            image: this.image,
        }
    }

}
