import { Injectable } from '@angular/core';
import { UserService } from '../../users/user.service';

@Injectable({
    providedIn: 'root'
})
export class AttemptService {

    constructor(
        private user_service: UserService
    ) {
    }

    async attempt() {
        return await this.user_service.validateToken(['access_level.permissions'])
            .then(
                async (data: any) => {
                    if (!data.error) {
                        this.user_service.setUser({ user: data }, false);
                        return true;
                    } else {
                        this.user_service.unsetUser();
                        return false;
                    }
                },
                error => {
                    return false
                }
            )
    }

}
