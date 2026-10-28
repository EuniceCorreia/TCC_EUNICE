import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class GameFigureService extends BaseService {

    override url = 'game-figures';

    constructor(injector: Injector) {
        super(injector);
    }
}