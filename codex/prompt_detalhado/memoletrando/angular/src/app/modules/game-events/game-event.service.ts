import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';
import { GameEvent } from './game-event';

@Injectable({
    providedIn: 'root'
})
export class GameEventService extends BaseService {

    override url = 'game-events';

    constructor(injector: Injector) {
        super(injector);
    }

    storeMultiple(game_events: GameEvent[] = []) {
        console.log(game_events);
        
        let data = game_events.map((ge) => new GameEvent(ge).http_data);
        console.log(data);
        
        return this.http.post(this.buildUrl('/save-multiple'), { game_events: data}, this.api_token).toPromise();
    }
}