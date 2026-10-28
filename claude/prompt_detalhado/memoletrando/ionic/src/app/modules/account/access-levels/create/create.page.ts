import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/base/helper.service';
import { AccessLevelService } from '../access-level.service';
import { AccessLevel } from '../access-level';
import { Permission } from '../../permissions/permission';
import { PermissionService } from '../../permissions/permission.service';
import { PermissionCategoryService } from '../../permissions/permission-category.service';
import { PermissionCategory } from '../../permissions/permission-category';

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

    public id: number;
    public access_level: AccessLevel;
    public permissions: Permission[] = [];
    public permission_categories: PermissionCategory[] = [];
    public editing: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private helperService: HelperService,
        private accessLevelService: AccessLevelService,
        private permissionService: PermissionService,
        private permissionCategoryService: PermissionCategoryService,
    ) {
        this.access_level = new AccessLevel;
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.getPermissionCategories();
        this.id = this.route.snapshot.paramMap.get("id") ? parseInt(this.route.snapshot.paramMap.get("id")) : null;
        this.getPermissions();
        this.find(this.id);
    }

    find(id: number) {
        if (id) {
            this.editing = true;
            this.getAccessLevel();
        }
    }

    getAccessLevel() {
        this.accessLevelService.find(['permissions.category'], { id: this.id })
            .then(
                (data: any) => {
                    this.access_level = new AccessLevel(data.access_level);
                    this.access_level.syncPermissions(this.permissions);

                },
                (error: any) => {
                    this.helperService.responseErrors(error);
                }
            );
    }

    save() {
        if (this.access_level.id > 0) {
            this.update();
        } else {
            this.store();
        }
    }

    store() {
        this.helperService.loading("Salvando");
        this.accessLevelService.store(this.access_level)
            .then(
                (data: any) => {
                    if (data.error) {
                        this.helperService.loading_dismiss();
                        this.helperService.toast('danger', data.message);
                        return false;
                    }
                    this.helperService.toast('success', data.message);
                    this.access_level.id = data.access_level.id;
                    this.helperService.loading_dismiss();
                    this.router.navigate(['access-levels', data.access_level.id], {
                        state: { force: true }
                    });
                },
                (error: any) => {
                    this.helperService.loading_dismiss();
                    this.helperService.responseErrors(error);
                }
            );
    }

    update() {
        this.helperService.loading("Salvando");
        this.accessLevelService.update(this.access_level)
            .then(
                (data: any) => {
                    if (data.error) {
                        this.helperService.loading_dismiss();
                        this.helperService.toast('danger', data.message);
                        return false;
                    }
                    this.helperService.loading_dismiss();
                    this.helperService.toast('success', data.message);
                },
                (error: any) => {
                    this.helperService.loading_dismiss();
                    this.helperService.responseErrors(error);
                }
            );
    }

    getPermissions() {
        this.permissionService.get(['category'])
            .then(
                (response: any) => {
                    if (response.error) {
                        this.permissions = [];
                        this.helperService.toast('danger', response.message);
                    } else {
                        this.permissions = response.user_permissions.map(
                            permission => new Permission(permission)
                        );
                    }
                    this.access_level.syncPermissions(this.permissions);
                },
                (error: any) => {
                    this.helperService.responseErrors(error);
                }
            )
    }

    getPermissionCategories() {
        this.permissionCategoryService.get()
            .then(
                (response: any) => {

                    if (response.error) {
                        this.permission_categories = [];
                        this.helperService.toast('danger', response.message);
                    } else {
                        this.permission_categories = response.user_permission_categories.map(
                            permission_category => new PermissionCategory(permission_category)
                        );
                    }
                },
                (error: any) => {
                    this.helperService.responseErrors(error);
                }
            )
    }
}
