import { Injectable, Injector } from '@angular/core';

import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class ConfigService extends BaseService {

    url: string = 'configs';
    singular: string = 'config';
    plural: string = 'configs';

    constructor(injector: Injector) {
        super(injector);
    }

    update(configs: Object): Promise<any> {
        return this.http.put(this.buildUrl(), configs, this.api_token).toPromise();
    }


    toggleOpenFiscalYears(open_fiscal_years: string): Promise<any> {
        return this.http.put(this.buildUrl('/toggle-open-fiscal-years'), { 'open_fiscal_years': open_fiscal_years }, this.api_token).toPromise();
    }

    updateActualDate(actual_date: string): Promise<any> {
        return this.http.put(this.buildUrl('/update-actual-date'), { 'actual_date': actual_date }, this.api_token).toPromise();
    }


}
