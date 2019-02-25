import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BillingDetailService } from '../steps/steps.service';
import { Company } from '../models/company.model';
import { CompanyService } from '../companies/company.service';

@Component({
  selector: 'billing-detail',
  templateUrl: './billing-detail.component.html',
  styleUrls: ['./billing-detail.component.css'],
  providers : [CompanyService, BillingDetailService]
})
export class BillingDetailComponent implements OnInit {

  billingForm : FormGroup;
  billingNumber : string;
  currentDate : Date = new Date();
  dateFormat : string;
  companies : Company[];
  
  constructor(private translateService : TranslateService, private billingDetailService : BillingDetailService, 
    private companyService : CompanyService, private formBuilder : FormBuilder) {
      
    this.translateService.get([
      'billing.dateFormat'
    ]).subscribe(result => {
      this.dateFormat = result['billing.dateFormat'];
    });
  }

  ngOnInit() {
    this.billingForm = this.formBuilder.group({
      selectCompany : ['', Validators.required],
      companyName : ['', Validators.required],
      companyTin : ['', Validators.required],
      contactName : ['', Validators.required],
      sourceName : ['', Validators.required],
      sourceTin : ['', Validators.required],
    });

    this.billingForm.controls.companyName.disable();
    this.billingForm.controls.companyTin.disable();
    this.billingForm.controls.contactName.disable();

    this.getBillingNumber();

    this.getCompanies();
  }

  getBillingNumber() {
    this.billingDetailService.getBillingNumber().subscribe(result => {
      this.billingNumber = result.Id;
    });
  }

  getCompanies() {
    this.companyService.getAll().subscribe(result => {
      this.companies = result;
    });
  }
}
