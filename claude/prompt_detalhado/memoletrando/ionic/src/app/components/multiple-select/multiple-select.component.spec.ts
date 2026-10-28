import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSelectComponent } from './multiple-select.component';

describe('MultipleSelectComponent', () => {
    let component: MultipleSelectComponent;
    let fixture: ComponentFixture<MultipleSelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MultipleSelectComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultipleSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

