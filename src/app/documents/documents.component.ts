import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
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
    'Select',
    'Name',
    'Size',
    'UploadDate',
    'Buttons'
  ];

  selection = new SelectionModel<UserDocument>(true, []);
  documents : MatTableDataSource<UserDocument>;
  paginatorLength : number = 0;
  isBusy : boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private service : DocumentService) { }

  ngOnInit() {
    this.getDocuments();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.documents.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.documents.data.forEach(row => this.selection.select(row));
  }

  getDocuments() {
    this.isBusy = true;

    this.service.getAll().subscribe(data => {
      this.isBusy = false;
      
      this.documents = new MatTableDataSource(data);
      this.documents.sort = this.sort;
      this.documents.paginator = this.paginator;
      this.paginatorLength = data.length;
    });
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
