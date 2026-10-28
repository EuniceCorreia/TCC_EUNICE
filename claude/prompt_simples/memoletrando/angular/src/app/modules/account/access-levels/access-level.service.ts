import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class AccessLevelService extends BaseService {

    public override url: string = 'access-levels';
    public override prefix: string = 'sg-api';

    constructor(injector: Injector) {
        super(injector);
    }
}
