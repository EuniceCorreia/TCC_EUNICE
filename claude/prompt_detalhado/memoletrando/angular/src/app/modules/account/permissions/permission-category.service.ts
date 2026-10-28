import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class PermissionCategoryService extends BaseService {

    public override url: string = 'user-permission-categories';
    public override prefix: string = 'sg-api';

    constructor(injector: Injector) {
        super(injector);
    }
}
