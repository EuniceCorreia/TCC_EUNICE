import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class ImageService extends BaseService {

    override url = 'images';

    constructor(injector: Injector) {
        super(injector);
    }

    reorder(models: any): Promise<any> {
        return this.http.put(this.buildUrl('/reorder'), models, this.api_token).toPromise();
    }
}