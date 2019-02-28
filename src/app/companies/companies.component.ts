import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Company } from '../models/company.model';
import { CompanyService } from './company.service';

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

  constructor(private service : CompanyService) { }

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
      {Id: "1", Email : "test@test.com", Address : "C", Tin : "8909006541", Cellphone : "3128145199", ContactName : "Carolina", ContactPosition : "Auxiliar", Telephone : "123 45 67", Name : "IMBOCAR"},
      {Id: "2", Email : "test2@test.com", Address : "C5", Tin : "123456789", Cellphone : "3115269841", ContactName : "Beto", ContactPosition : "CEO", Telephone : "452 69 87", Name : "ENVIA"}
    ];

    this.companies = new MatTableDataSource(data);
    this.companies.sort = this.sort;
    this.companies.paginator = this.paginator;
    this.paginatorLength = data.length;
  }

  selectItem(row : any) {

  }

  showDetail(row : any) {
    
  }

  edit(row : any) {
    
  }

  confirmDelete(row : any) {

  }

  mouseEnter(e : any) {
    const obj = document.getElementById(e);
    obj.style.right = "30px";
  }

}
