import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class AuditingService extends BaseService {

    url = 'auditings';

    constructor(injector: Injector) {
        super(injector);
    }

}