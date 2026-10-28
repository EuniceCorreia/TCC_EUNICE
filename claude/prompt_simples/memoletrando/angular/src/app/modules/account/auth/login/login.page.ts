import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../users/user.service';
import { HelperService } from 'src/app/base/helper.service';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../users/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    credentials: any;
    showPassword: boolean = false;

    hide = true;

    teachers: User[] = [];

    constructor(
        private router: Router,
        private user_service: UserService,
        private helper_service: HelperService,
    ) {
    }
    
    ngOnInit(): void {
        this.credentials = {
            username: null,
            password: null,
            teacher_id: null
        }

        this.init();
    }

    init(): any {
        if (this.user_service.isLoggedIn) {
            return this.router.navigate(['/temas']);
        }

        if (localStorage.getItem(this.user_service.api_token_name)) {
            return this.router.navigate(['/auth/attempt']);
        }

        this.getTeachers();
    }

    getTeachers() {
        this.user_service.getTeachers([], { active: 1, access_level_id: 2 }).then(
            (response: any) => {
                if(response.error) {
                    this.helper_service.toast('danger', 'Alguma coisa deu errado');
                    return;
                }

                this.teachers = response.users.map((l: User) => new User(l));

                if(this.teachers.length) {
                    this.credentials.teacher_id = this.teachers[0].id
                } 
            },
            (error: any) => {
                console.log(error);
                // this.helper_service.responseErrors(error);
            }
        )
      }

    login() {
        if (!this.credentials.username || !this.credentials.password) {
            this.helper_service.toast('warning', 'Insira um nome de usuário e senha válidos');
            return;
        }
        this.helper_service.loading();
        this.user_service.login(this.credentials, ['access_level.permissions']).then(
            (data: any) => {
                if (data.token) {
                    this.user_service.setUser(data, null);
                    this.router.navigate(['/temas']);
                } else {
                    this.helper_service.toast('danger', 'Insira um nome de usuário e senha válidos');
                }
                this.helper_service.loading_dismiss();
            },
            (error: any) => {
                this.helper_service.loading_dismiss();
                this.helper_service.responseErrors(error);
            }
        )
    }
}