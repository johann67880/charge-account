import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { CompaniesComponent } from '../app/companies/companies.component';
import { DocumentsComponent } from '../app/documents/documents.component';
import { BillingsComponent } from '../app/billings/billings.component';

const routes: Routes = [
    { path: "", component: HomeComponent, data: { title: "Home" } },
    { path: "home", component: HomeComponent, data: { title: "Home" } },
    { path: "companies", component: CompaniesComponent, data: { title: "Companies" } },
    { path: "documents", component: DocumentsComponent, data: { title: "Documents" } },
    { path: "billings", component: BillingsComponent, data: { title: "Billings" } },
  ];
  
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule { }