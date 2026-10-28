import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';
import { GameFigure } from './game-figure';

@Injectable({
    providedIn: 'root'
})
export class GameFigureService extends BaseService {

    url = 'game-figures';

    constructor(injector: Injector) {
        super(injector);
    }
}