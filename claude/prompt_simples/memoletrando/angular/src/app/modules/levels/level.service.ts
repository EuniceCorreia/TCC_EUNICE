import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class LevelService extends BaseService {

    override url: string = 'levels';

    constructor(injector: Injector, router: Router) {
        super(injector);
    }
}
