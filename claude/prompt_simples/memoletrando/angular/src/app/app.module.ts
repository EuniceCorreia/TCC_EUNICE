import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module';
import { ModalCategoryComponent } from './modal-category/modal-category.component'
import { ToastrModule, ToastNoAnimationModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ModalCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule,
    ToastNoAnimationModule.forRoot(),
    NgxSpinnerModule
  ],
  exports: [AppRoutingModule],
  providers: [ModalCategoryComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
