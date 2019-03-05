import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { BillingsService } from './billings.service';
import { BillingDetail } from '../models/billingDetail.model';
import { ProductDetail } from '../models/productDetail.model';
import { CommonService } from '../services/common-service.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../common/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'billings',
  templateUrl: './billings.component.html',
  styleUrls: ['./billings.component.css'],
  providers :[BillingsService, CommonService]
})
export class BillingsComponent implements OnInit {

  isBusy : boolean = false;
  dateFormat : string;

  displayedColumns: string[] = [
    'BillingId',
    'PriceValue',
    'CreationDate',
    'Buttons'
  ];

  billings : MatTableDataSource<BillingDetail>;
  paginatorLength : number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private billingService : BillingsService, private translateService : TranslateService, 
    private commonService : CommonService, private route : Router, public dialog: MatDialog) { 
    this.translateService.get([
      'billing.dateFormat'
    ]).subscribe(result => {
      this.dateFormat = result['billing.dateFormat'];
    });
  }

  ngOnInit() {
    this.getBillings();
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  getBillings() {

    ////TODO: Remove this comment when real API exists
    /*
    this.billingService.getAll().subscribe(data => {
      this.billings = new MatTableDataSource(data);
      this.billings.sort = this.sort;
      this.billings.paginator = this.paginator;
      this.paginatorLength = data.length;
    });
    */

    let data = [
      {Id : "001", CreationDate : new Date(), CustomerId : "1", Name : "Beto", DocumentId : "1214714063", PriceValue : 1241000, PriceDescription : "Un millón doscientos cuarenta y un mil pesos", Products : [] },
      {Id : "002", CreationDate : new Date(), CustomerId : "2", Name : "Prueba remitente", DocumentId : "1214714063", PriceValue : 850000, PriceDescription : "Ochocientos cincuenta mil pesos", Products : [] },
      {Id : "003", CreationDate : new Date(), CustomerId : "3", Name : "Johann Jimenez", DocumentId : "1214714063", PriceValue : 450000, PriceDescription : "Cuatrocientos cincuenta mil pesos", Products : [] },
      {Id : "004", CreationDate : new Date(), CustomerId : "4", Name : "Johann Alberto Jimenez", DocumentId : "1214714063", PriceValue : 700000, PriceDescription : "Setecientos mil pesos", Products : [] },
    ];

    this.billings = new MatTableDataSource(data);
    this.billings.sort = this.sort;
    this.billings.paginator = this.paginator;
    this.paginatorLength = data.length;
  }

  selectItem(row : any) {

  }

  createBilling() {
    this.commonService.setSelectedBillingId("");
    this.route.navigate(['steps']);
  }

  showDetail(row : any) {
    this.commonService.setSelectedBillingId(row.Id);
    this.route.navigate(['steps/' + this.commonService.getSelectedBillingId()]);
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
