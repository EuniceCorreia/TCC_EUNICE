import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';
import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import { CurrencyPipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListPopoverComponent } from './components/list-popover/list-popover.component';

import pt from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";

registerLocaleData(pt);


@NgModule({
    declarations: [AppComponent, ListPopoverComponent],
    entryComponents: [ListPopoverComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FontAwesomeModule,
        DragulaModule.forRoot(),
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, CurrencyPipe, { provide: LOCALE_ID, useValue: "pt-BR" },],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, fab, far);
    }
}
