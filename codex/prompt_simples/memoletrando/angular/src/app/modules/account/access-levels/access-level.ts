import { Serializable } from 'src/app/base/serializable';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Permission } from '../permissions/permission';

export class AccessLevel extends Serializable {

    public override id: any = null;
    public name: string = '';
    public active: boolean = true;
    
    public created_at: moment.Moment | null = null;
    public updated_at: moment.Moment | null = null;
    public deleted_at: moment.Moment | null = null;

    public permissions: Permission[] = [];

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    override get relations() {
        return {
            permissions: Permission,
        };
    }

    override get http_data() {
        return {
            name: this.name,
            active: this.active,
            permissions: this.permission_data,
        }
    }

    get permission_data() {
        return this.permissions.map(permission => permission.http_data);
    }

    override get dates() {
        return ['created_at', 'updated_at', 'deleted_at'];
    }

    syncPermissions(permissions: Array<Permission>) {
        var current_permissions = this.permissions.map(permission => permission.id);

        permissions.forEach(permission => {
            if (!current_permissions.includes(permission.id)) {
                this.permissions.push(permission);
            }
        });
    }
}
