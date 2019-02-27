import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Company } from '../models/company.model';
import { ProductDetail } from '../models/productDetail.model';
import { TranslateService } from '@ngx-translate/core';
import { BillingDetailService } from './steps.service';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers : [BillingDetailService]
})
export class StepsComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;
  
  constructor(private location : Location) {
  }

  ngOnInit() {
  }

  goBack() : void {
    this.location.back();
  }

  changeStep(event : any) {
    
  }
}
