import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-billing-detail',
  templateUrl: './billing-detail.component.html',
  styleUrls: ['./billing-detail.component.css']
})
export class BillingDetailComponent implements OnInit {

  constructor(private location : Location) { }

  ngOnInit() {
  }

  goBack() : void {
    this.location.back();
  }

}
