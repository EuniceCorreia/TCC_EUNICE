import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';
import { UserService } from '../../users/user.service';

@Directive({
    selector: '[ifAuth]'
})
export class IfAuthDirective {

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private userService: UserService
    ) {

    }

    @Input()
    set ifAuth(permissions: Array<Object>) {
        if (this.userCan(permissions)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

    userCan(permissions: Array<Object>) {
        // , creating: boolean = false
        if (this.userService.user.super_admin == true) return true;
        return permissions.map(permission =>
            this.userService.user.can(Object.keys(permission)[0], Object.values(permission)[0])
        ).every(
            permission => (permission === true)
        );
    }
}
