import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './common/material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CompaniesComponent } from './companies/companies.component';
import { BillingsComponent } from './billings/billings.component';
import { DocumentsComponent } from './documents/documents.component';
import { StepsComponent } from './steps/steps.component';
import { BillingPreviewComponent } from './billing-preview/billing-preview.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CommonService } from './services/common-service.service';
import { BillingDetailComponent } from './billing-detail/billing-detail.component';

import { FileUploadModule } from 'ng2-file-upload';
import { ConfirmationDialogComponent } from './common/confirmation-dialog/confirmation-dialog.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';

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
      StepsComponent,
      BillingPreviewComponent,
      ProductDetailComponent,
      CompanyDetailComponent,
      BillingDetailComponent,
      ConfirmationDialogComponent,
      DocumentDetailComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      MaterialModule,
      HttpClientModule,
      FlexLayoutModule,
      FileUploadModule,
      FormsModule,
      TranslateModule.forRoot({
         loader: {
             provide: TranslateLoader,
             useFactory: (createTranslateLoader),
             deps: [HttpClient]
         }
     })
   ],
   entryComponents : [ConfirmationDialogComponent, DocumentDetailComponent],
   providers: [
      { provide: 'BASE_URL', useFactory: getBaseUrl },
      CommonService
    ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
