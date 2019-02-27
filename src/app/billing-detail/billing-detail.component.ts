import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BillingDetailService } from '../steps/steps.service';
import { Company } from '../models/company.model';
import { CompanyService } from '../companies/company.service';
import { CommonService } from '../services/common-service.service';
import { CompanyStepModel } from '../models/companyStep.model';

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
  selectedCompany : Company;
  companyModel : CompanyStepModel = new CompanyStepModel();
  
  constructor(private translateService : TranslateService, private billingDetailService : BillingDetailService, 
    private companyService : CompanyService, private formBuilder : FormBuilder, private commonService : CommonService) {
      
    this.translateService.get([
      'billing.dateFormat'
    ]).subscribe(result => {
      this.dateFormat = result['billing.dateFormat'];
    });
  }

  ngOnInit() {
    this.billingForm = this.formBuilder.group({
      selectCompany : ['', Validators.required],
      companyName : ['', Validators.required, {value: 'Nancy', disabled: true}],
      companyTin : ['', Validators.required],
      contactName : ['', Validators.required],
      destinationName : ['', Validators.required],
      destinationTin : ['', Validators.required],
    });

    this.billingForm.controls.companyName.disable();
    this.billingForm.controls.companyTin.disable();
    this.billingForm.controls.contactName.disable();

    this.getBillingNumber();

    this.getCompanies();

    this.billingForm.valueChanges.subscribe(data => {
      //set selected company to be obtained from other siblings components
      this.companyModel.selectedCompany = this.selectedCompany;
      this.companyModel.destinationName =  this.billingForm.controls.destinationName.value;
      this.companyModel.destinationTin = this.billingForm.controls.destinationTin.value;

      this.commonService.setSelectedCompany(this.companyModel);
    });
  }

  getBillingNumber() {
    
    /*
    this.billingDetailService.getBillingNumber().subscribe(result => {
      this.billingNumber = result.Id;
      this.commonService.setBillingId(this.billingNumber);
    });
    */

    ////TODO : remove this line where exists real API
    this.billingNumber = "12345";
    this.commonService.setBillingId(this.billingNumber);
  }

  getCompanies() {

    /*
    this.companyService.getAll().subscribe(result => {
      this.companies = result;
    });
    */

    ////TODO : Remove mock data

    this.companies = [
      {Id: "1", Email : "test@test.com", Address : "Calle 54", Tin : "8909006541", Cellphone : "3128145199", ContactName : "Carolina", ContactPosition : "Auxiliar", Telephone : "123 45 67", Name : "IMBOCAR"},
      {Id: "2", Email : "test2@test.com", Address : "Calle 45", Tin : "123456789", Cellphone : "3115269841", ContactName : "Beto", ContactPosition : "CEO", Telephone : "452 69 87", Name : "ENVIA"}
    ];
  }

  getSelectedCompany(event : any) {
    this.selectedCompany = this.companies.find(c => c.Id == event.value);
    this.billingForm.controls.companyName.setValue(this.selectedCompany.Name);
    this.billingForm.controls.companyTin.setValue(this.selectedCompany.Tin);
    this.billingForm.controls.contactName.setValue(this.selectedCompany.ContactName);
  }
}
