import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';

import { User } from '../account/users/user';

export class Customer extends Serializable {

    id: number = null;
    doc: string = null;
    birth_date: string = null;
    receive_push: boolean = true;
    receive_email: boolean = true;
    created_at: moment.Moment = null;
    updated_at: moment.Moment = null;
    deleted_at: moment.Moment = null;

    user: User = new User;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    get relations() {
        return {
            user: User,
        }
    }

    get dates() {
        return ['created_at', 'updated_at', 'deleted_at'];
    }

    get http_data() {
        return {
            id: this.id,
            user: this.user,
            doc: this.doc,
            birth_date: this.birth_date.length < 8 ? 'Invalid Date' : moment(this.birth_date, "DDMMYYYY").format("YYYY-MM-DD"),
            receive_push: this.receive_push,
            receive_email: this.receive_email,
        }
    }

    get name() {
        return this.user.name;
    }
}
