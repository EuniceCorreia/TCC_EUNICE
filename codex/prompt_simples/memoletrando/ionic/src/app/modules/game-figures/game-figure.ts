import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';
import { Image } from '../images/image';
import { Level } from '../levels/level';
import { User } from '../account/users/user';
import { Category } from '../categories/category';
import { Theme } from '../themes/theme';

export class GameFigure extends Serializable {

    id: number = null;
    name: string = null;
    description: string = null;
    active: boolean = true;
    level_id: number = null;
    category_id: number = null;
    user_id: number = null;

    //  aux
    theme_id: number = null;
    
    created_at: moment.Moment = null;
    updated_at: moment.Moment = null;
    deleted_at: moment.Moment = null;

    image: Image = new Image;
    level: Level = null;
    category: Category = null;
    user: User = null;
    theme: Theme = null;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    get relations() {
        return {
            image: Image,
            level: Level,
            category: Category,
            user: User,
            theme: Theme
        }
    }

    get dates() {
        return ['created_at', 'updated_at', 'deleted_at'];
    }

    get http_data() {
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
