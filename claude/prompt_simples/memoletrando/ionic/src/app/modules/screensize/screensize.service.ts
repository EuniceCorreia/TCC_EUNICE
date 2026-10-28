import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ScreensizeService {

    private isDesktop = new BehaviorSubject(false);
    sizeValue = new EventEmitter;

    constructor() {
    }

    onResize(size: number) {
        if (size < 768) {
            this.isDesktop.next(false);
        } else {
            this.isDesktop.next(true);
        }

        this.sizeValue.emit(size);
    }

    isDesktopView(): Observable<boolean> {
        return this.isDesktop.asObservable()
            .pipe(distinctUntilChanged());
    }

}