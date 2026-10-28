import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class PermissionService extends BaseService {

    public url: string = 'user-permissions';
    public prefix: string = 'sg-api';

    constructor(injector: Injector) {
        super(injector);
    }
}
