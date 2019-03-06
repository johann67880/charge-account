import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Company } from '../models/company.model';
import { CompanyService } from './company.service';
import { ConfirmationDialogComponent } from '../common/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { CommonService } from '../services/common-service.service';

@Component({
  selector: 'companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  providers: [CompanyService]
})
export class CompaniesComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = [
    'Tin',
    'Name',
    'Email',
    'Telephone',
    'Address',
    'Buttons'
  ];

  companies : MatTableDataSource<Company>;
  paginatorLength : number = 0;
  isBusy : boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service : CompanyService, public dialog: MatDialog, 
    private route : Router, private commonService : CommonService) { }

  ngOnInit() {
    this.getCompanies();
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  getCompanies() {
    /*
    this.isBusy = true;

    this.service.getAll().subscribe(data => {
      this.isBusy = false;
      
      this.companies = new MatTableDataSource(data);
      this.companies.sort = this.sort;
      this.companies.paginator = this.paginator;
      this.paginatorLength = data.length;
    });
    */
   
     let data = [
      {Id: "1", Email : "test@test.com", Address : "Calle 43 # 32 BB Medellín Antioquia", Tin : "8909006541", Cellphone : "3128145199", ContactName : "Carolina", ContactPosition : "Auxiliar", Telephone : "123 45 67", Name : "IMBOCAR"},
      {Id: "2", Email : "test2@test.com", Address : "Carrera 12 A # 15 B 47", Tin : "123456789", Cellphone : "3115269841", ContactName : "Omar de Jesus Gaviria Moreno", ContactPosition : "Director de Logistica", Telephone : "452 69 87", Name : "Empresa de motores y repuestos"}
    ];

    this.companies = new MatTableDataSource(data);
    this.companies.sort = this.sort;
    this.companies.paginator = this.paginator;
    this.paginatorLength = data.length;
  }

  selectItem(row : any) {

  }

  createCompany() {
    this.commonService.setSelectedCompanyId("");
  }

  showDetail(row : any) {
    this.commonService.setSelectedCompanyId(row.Id);
    this.route.navigate(['companies-detail']);
  }

  confirmDelete(row : any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  mouseEnter(e : any) {
    const obj = document.getElementById(e);
    obj.style.right = "50px";
  }

}
