import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends BaseService {

    url = 'dashboard';

    constructor(injector: Injector) {
        super(injector);
    }

    exportExcel(wheres: Object = {}) {
        window.open(
            this.buildUrl('/export-excel', [], wheres) + '&token=' + this.api_token.params.token
        );
    }

    exportPdf(wheres: Object = {}) {
        window.open(
            this.buildUrl('/export-pdf', [], wheres) + '&token=' + this.api_token.params.token
        );
    }

    getSubscriptionsPerMonth(month: string, year: string): Promise<any> {
        return this.http.get(this.buildUrl('/subscriptions-per-month/' + month + '/' + year), this.api_token).toPromise();
    }
}