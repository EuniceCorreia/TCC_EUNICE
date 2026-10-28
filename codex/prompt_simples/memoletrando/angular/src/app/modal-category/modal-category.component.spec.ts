import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../material-module';
import { HelperService } from '../base/helper.service';

import { ModalCategoryComponent } from './modal-category.component';

describe('ModalCategoryComponent', () => {
  let component: ModalCategoryComponent;
  let fixture: ComponentFixture<ModalCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCategoryComponent ],
      imports: [MaterialModule, NoopAnimationsModule, RouterTestingModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { categories: [] } },
        { provide: MatDialogRef, useValue: jasmine.createSpyObj('dialogRef', ['close']) },
        { provide: HelperService, useValue: jasmine.createSpyObj('helper', ['toast']) }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
