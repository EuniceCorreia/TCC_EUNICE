import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';
import { Serializable } from 'src/app/base/serializable';

@Injectable({
    providedIn: 'root'
})
export class CustomerService extends BaseService {

    url = 'customers';

    constructor(injector: Injector) {
        super(injector);
    }

    internalStore(model: Serializable): Promise<any> {
        return this.http.post(this.buildUrl('/internal-store'), model.http_data, this.api_token).toPromise();
    }

    internalUpdate(model: Serializable): Promise<any> {
        return this.http.put(this.buildUrl('/' + model.id + '/internal-update'), model.http_data, this.api_token).toPromise();
    }

}