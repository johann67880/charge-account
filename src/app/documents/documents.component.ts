import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { UserDocument } from '../models/document.model';
import { DocumentService } from './documents.service';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ConfirmationDialogComponent } from '../common/confirmation-dialog/confirmation-dialog.component';

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

  allowedMimeType = [];
  hasDropZoneOver : boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private service : DocumentService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getDocuments();
  }

  public uploader: FileUploader = new FileUploader({
    allowedMimeType: this.allowedMimeType
  });

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.documents.data.length;
    return numSelected === numRows;
  }

  public fileOverBase(e: any):void {
    this.hasDropZoneOver = e;
  }

  onSelectFile(event) {

    //dropped image
    if(event[0]) {
        var reader = new FileReader();

        reader.onload = (event) => {
          ////TODO :  consume API to upload document
        }

        reader.readAsDataURL(event[0]);
    }

    //input file
    else if (event.target && event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        var file = event.target.files[0];

        reader.onloadend = (event) => {
          ////TODO :  consume API to upload document
        }

        reader.readAsDataURL(file);
    }
    else {
        //invalid file. not image
    }
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
