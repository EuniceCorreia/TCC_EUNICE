import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { HelperService } from '../../../base/helper.service';
import { UserService } from '../users/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router,
        private helperService: HelperService,
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.userService.isLoggedIn) {
            return new Promise(resolve => {

                if (next.data && next.data.auth) {
                    var creating = (next.params.id && next.params.id == 0);
                    var res: any = this.parseAuth(next.data.auth, creating);
                } else {
                    var res: any = true;
                }

                if (!res) {
                    this.helperService.toast('danger', 'Você não tem permissão para acessar esta página', 3000, 'top-right');
                    resolve(this.router.parseUrl("/dashboard"));
                }

                resolve(true);
            })
        } else {
            return this.router.navigate(["/auth/attempt", { url: state.url }]);
        }
    }

    parseAuth(auth: Array<Object>, creating: boolean = false) {
        if (this.userService.user.super_admin == true) return true;
        return auth.map(permission =>
            this.userService.user.can(Object.keys(permission)[0], Object.values(permission)[0])
        ).every(
            permission => (permission === true)
        );
    }

}
