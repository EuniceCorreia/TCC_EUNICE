import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';

export class Auditing extends Serializable {

    id: number = null;
    log_name: string = null;
    description: string = null;
    subject_type: string = null;
    subject_id: string = null;
    causer_type: string = null;
    causer_id: number = null;
    properties: string = null;
    causer: any = {};
    created_at: moment.Moment = null;
    updated_at: moment.Moment = null;

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
            log_name: this.log_name,
            description: this.description,
            subject_type: this.subject_type,
            subject_id: this.subject_id,
            causer_type: this.causer_type,
            causer_id: this.causer_id,
            properties: this.properties,
        }
    }

    get subject_class() {
        return this.subject_type.replace(/_/g, ' ')
    }

}
