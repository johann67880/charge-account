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
    'Address'
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
    this.isBusy = true;

    this.service.getAll().subscribe(data => {
      this.isBusy = false;
      
      this.companies = new MatTableDataSource(data);
      this.companies.sort = this.sort;
      this.companies.paginator = this.paginator;
      this.paginatorLength = data.length;
    });
  }

}
