import { Injectable, Injector, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { BaseService } from 'src/app/base/base.service';
import { Serializable } from 'src/app/base/serializable';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {

    user: User | null = null;
    router: Router;
    override prefix: string = 'sg-api';
    override url: string = 'users';
    _userAllow = new EventEmitter;

    constructor(injector: Injector, router: Router) {
        super(injector);
        this.router = router;
    }

    get isLoggedIn() {
        return (this.user != null);
    }

    login(credentials: any, relations: Array<string> = []): Promise<any> {
        return this.http.post(
            this.buildUrl('/authenticate', relations, { system: false }),
            credentials
        ).toPromise();
    }

    logout() {
        this.unsetUser();
        this.router.navigate(['/auth/login']);
    }

    validateToken(relations: Array<string> = []): Promise<any> {
        return this.http.get(
            this.buildUrl('/validate-token', relations),
            this.api_token
        ).toPromise();
    }

    newPassword(user: Serializable): Promise<any> {
        return this.http.put(
            this.buildUrl('/' + user.id + '/new-password'),
            user,
            this.api_token
        ).toPromise();
    }

    setUser(data: any, callback: any) {

        if (data.token) {
            this.setApiToken(data.token);
        }

        if (data.user) {
            this.user = new User(data.user);
        }

        this._userAllow.emit(this.isLoggedIn);

        if (callback) {
            callback(true);
        }
    }

    unsetUser(callback: any = null) {
        this.unsetApiToken();
        this.user = null;
        this._userAllow.emit(this.isLoggedIn);
        if (callback) {
            callback(true);
        }
    }

    getTeachers(relations: any = [], wheres: any = {}): Promise<any> {
        return this.http.get(
            this.buildUrl('/get-teachers', relations, wheres),
            this.api_token
        ).toPromise();
    }
}
