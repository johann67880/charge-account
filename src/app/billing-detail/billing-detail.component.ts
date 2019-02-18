import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Company } from '../models/company.model';
import { BillingDetail } from '../models/billingDetail.model';

@Component({
  selector: 'billing-detail',
  templateUrl: './billing-detail.component.html',
  styleUrls: ['./billing-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BillingDetailComponent implements OnInit {

  firstFormGroup : FormGroup;

  company : Company;
  items : BillingDetail[];
  description : string;

  constructor(private location : Location, private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({ });
  }

  goBack() : void {
    this.location.back();
  }

}
