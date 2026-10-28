import { Injector, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Serializable } from './serializable';

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    url: string = '';
    api_url: string = environment.api_url;
    api_token_name: string = environment.api_token;
    url_s3: string = environment.url_s3;
    http: HttpClient;
    factory: Serializable;
    prefix: string = 'api';
    singular: string = 'model';
    plural: string = 'models';

    constructor(injector: Injector, factory: Serializable = new Serializable) {
        this.http = injector.get(HttpClient);
        this.factory = factory;
    }

    get base_url() {
        return this.api_url + '/' + this.prefix + '/' + this.url;
    }

    buildUrl(path: any = '', relations: Array<any> = [], wheres: Object = {}, paginate: any = {}) {
        var url = this.base_url + path + '?';

        if (paginate && paginate.take) {
            url += 'take=' + paginate.take + '&page=' + paginate.page + '&paginate=true' + '&';
        }

        if (relations.length > 0 || Object.keys(wheres).length > 0) {
            url += this.$relations(relations) + this.$wheres(wheres);
        }

        return url;
    }

    get(relations: Array<any> = [], wheres: Object = {}, paginate: Object = {}): Promise<any> {
        return this.http.get(this.buildUrl('/get', relations, wheres, paginate), this.api_token).toPromise();
    }

    find(relations: Array<any> = [], wheres: Object = {}): Promise<any> {
        return this.http.get(this.buildUrl('/find', relations, wheres), this.api_token).toPromise();
    }

    storeOrUpdate(model: Serializable) {
        return model.id ? this.update(model) : this.store(model);
    }

    store(model: Serializable): Promise<any> {
        return this.http.post(this.buildUrl(), model.http_data, this.api_token).toPromise();
    }

    update(model: Serializable): Promise<any> {
        return this.http.put(this.buildUrl('/' + model.id), model.http_data, this.api_token).toPromise();
    }

    $put(data: any): Promise<any> {
        return this.http.put(data.url, data.data ? data.data : {}, this.api_token).toPromise();
    }

    $post(data: any): Promise<any> {
        return this.http.post(data.url, data.data ? data.data : {}, this.api_token).toPromise();
    }

    $delete(data: any): Promise<any> {
        return this.http.delete(data.url, this.api_token).toPromise();
    }

    $get(data: any): Promise<any> {
        return this.http.get(data.url, this.api_token).toPromise();
    }

    destroy(id: any): Promise<any> {
        return this.http.delete(this.buildUrl('/' + id), this.api_token).toPromise();
    }

    restore(id: any): Promise<any> {
        return this.http.put(this.buildUrl('/' + id + '/restore'), this.api_token).toPromise();
    }

    $paginations(paginate: any) {
        return '?sorting[' + paginate.sorting.column + ']=' + paginate.sorting.value + '&count=' + paginate.take + '&page=' + paginate.page + '&';
    }

    $relations(relations: Array<string>) {
        var url_string = '';

        if (relations.length) {

            relations.forEach(relation => {
                url_string += 'relations[]=' + encodeURIComponent(relation) + '&'
            });
        }

        return url_string;
    }

    $wheres(wheres: any) {
        if (!wheres) {
            return '';
        }

        var url_string = '';

        var keys = Object.keys(wheres);

        keys.forEach(key => {
            if (Array.isArray(wheres[key])) {
                wheres[key].forEach((value: any) => {
                    if (typeof value == 'string') {
                        url_string += 'wheres[' + encodeURIComponent(key) + '][]=' + value + '&';
                    } else {
                        url_string += 'wheres[' + encodeURIComponent(key) + '][]=' + (JSON.stringify(value)) + '&';
                    }
                });
            } else {
                url_string += 'wheres[' + encodeURIComponent(key) + ']=' + encodeURIComponent(wheres[key]) + '&'
            }

        });

        return url_string;
    }

    $getParams(params: any) {
        if (!params) {
            return '';
        }

        var url_string = '';

        var keys = Object.keys(params);

        keys.forEach(key => {
            if (Array.isArray(params[key])) {
                params[key].forEach((value:any) => {
                    if (typeof value == 'string') {
                        url_string += encodeURIComponent(key) + '[]=' + value + '&';
                    } else {
                        url_string += encodeURIComponent(key) + '[]=' + (JSON.stringify(value)) + '&';
                    }
                });
            } else {
                url_string += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
            }

        });

        return url_string;
    }

    get api_token(): any {
        return {
            params: {
                token: this.api_token_value
            }
        };
    }

    get api_token_value() {
        return localStorage.getItem(this.api_token_name);
    }

    setApiToken(token: string) {
        localStorage.setItem(this.api_token_name, token);
    }

    unsetApiToken() {
        localStorage.removeItem(this.api_token_name);
    }
}
