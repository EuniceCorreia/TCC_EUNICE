import { Serializable } from 'src/app/base/serializable';
import { AccessLevel } from '../access-levels/access-level';
import * as moment from 'moment';

export class User extends Serializable {

    override id: number | null = null;
    name: string | null = null;
    email: string | null = null;
    username: string | null = null;
    password: string | null = null;
    password_confirmation: string | null = null;
    active: boolean = true;
    authenticable_type: string | null = null;
    authenticable_id: number | null = null;
    authenticable: any = null;
    super_admin: boolean = false;
    created_at: moment.Moment | null = null;
    updated_at: moment.Moment | null = null;
    deleted_at: moment.Moment | null = null;
    has_inventories: boolean = false

    access_level: AccessLevel = new AccessLevel;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
        this.setAuthenticable(this.authenticable);
    }

    override get relations() {
        return {
            access_level: AccessLevel,
        }
    }

    override get dates() {
        return ['created_at', 'updated_at', 'deleted_at'];
    }

    override get http_data() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password,
            password_confirmation: this.password_confirmation,
            access_level_id: this.access_level_id,
            active: this.active,
            authenticable_type: this.authenticable_type,
            authenticable_id: this.authenticable_id
        };
    }

    setAuthenticable(authenticable: any = null) {
        if (!authenticable) return;

        // if (this.authenticable_id) {
        //     if (this.authenticable_type == 'players') {
        //         this.authenticable = new Player(authenticable);
        //     }
        // }
        return;
    }

    get access_level_id() {
        return this.access_level ? this.access_level.id : null;
    }


    get is_admin() {
        return this.access_level_id == 1;
    }

    get is_teacher() {
        return this.access_level_id == 2;
    }

    get is_player() {
        return this.access_level_id == 3;
    }

    can(action: string, category: string) {
        if (!this.access_level) {
            return false;
        }

        var permission = this.access_level.permissions.find(permission =>
            (permission.type == action) &&
            (permission.category && permission.category.type == category)
        );

        if (permission) {
            return permission.pivot.allow;
        }

        return false;
    }

    get avatar_name() {
        var parts = this.name ? this.name.split(" ") : '';
        return parts[0] + (parts.length > 1 ? " " + parts[1] : '');
    }


}
