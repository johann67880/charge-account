import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './common/material.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CompaniesComponent } from './companies/companies.component';
import { BillingsComponent } from './billings/billings.component';
import { DocumentsComponent } from './documents/documents.component';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      CompaniesComponent,
      BillingsComponent,
      DocumentsComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      MaterialModule
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
