import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class PermissionService extends BaseService {

    public override url: string = 'user-permissions';
    public override prefix: string = 'sg-api';

    constructor(injector: Injector) {
        super(injector);
    }
}
