import { Injectable } from '@angular/core';
import { UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../users/user.service';

@Injectable({
    providedIn: 'root'
})
export class GuestGuard implements CanActivate {

    constructor(
        private userService: UserService
    ) {
        //
    }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Promise(resolve => {
            resolve(this.userService.isLoggedIn);
        });
    }
}
