import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-billing-detail',
  templateUrl: './billing-detail.component.html',
  styleUrls: ['./billing-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BillingDetailComponent implements OnInit {

  firstFormGroup : FormGroup;

  constructor(private location : Location, private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({ });
  }

  goBack() : void {
    this.location.back();
  }

}
