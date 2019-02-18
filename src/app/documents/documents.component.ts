import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserDocument } from '../models/document.model';
import { DocumentService } from './documents.service';

@Component({
  selector: 'documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers : [DocumentService]
})
export class DocumentsComponent implements OnInit {

  displayedColumns: string[] = [
    'Name',
    'Size',
    'UploadDate'
  ];

  companies : MatTableDataSource<UserDocument>;
  paginatorLength : number = 0;
  isBusy : boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private service : DocumentService) { }

  ngOnInit() {
    this.getDocuments();
  }

  getDocuments() {
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
