import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class GameSettingService extends BaseService {

    override url: string = 'game-settings';

    constructor(injector: Injector, router: Router) {
        super(injector);
    }

    getSettingAndImages(game_setting_id: number | null = null): Promise<any> {
        return this.http.get(
            this.buildUrl('/get-setting-and-images/' + game_setting_id),
            this.api_token
        ).toPromise();
    }
}
