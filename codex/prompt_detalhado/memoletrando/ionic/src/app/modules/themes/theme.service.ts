import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';
import { Theme } from './theme';

@Injectable({
    providedIn: 'root'
})
export class ThemeService extends BaseService {

    url = 'themes';

    constructor(injector: Injector) {
        super(injector);
    }

    saveOrder(models: Theme[]): Promise<any> {
        return this.http.put(this.buildUrl('/save-order'), models.map(model => model.id), this.api_token).toPromise();
    }
}