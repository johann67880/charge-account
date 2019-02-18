import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './common/material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CompaniesComponent } from './companies/companies.component';
import { BillingsComponent } from './billings/billings.component';
import { DocumentsComponent } from './documents/documents.component';
import { BillingDetailComponent } from './billing-detail/billing-detail.component';
import { BillingPreviewComponent } from './billing-preview/billing-preview.component';

export function createTranslateLoader(http: HttpClient) {
   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      CompaniesComponent,
      BillingsComponent,
      DocumentsComponent,
      BillingDetailComponent,
      BillingPreviewComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      MaterialModule,
      HttpClientModule,
      TranslateModule.forRoot({
         loader: {
             provide: TranslateLoader,
             useFactory: (createTranslateLoader),
             deps: [HttpClient]
         }
     })
   ],
   providers: [
      { provide: 'BASE_URL', useFactory: getBaseUrl }
    ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
