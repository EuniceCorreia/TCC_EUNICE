import { Injectable, Injector, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class ThemeService extends BaseService {

    override url: string = 'themes';

    constructor(injector: Injector, router: Router) {
        super(injector);
    }
}
