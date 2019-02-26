import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DocumentType } from '../models/documentType';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CommonService } from '../services/common-service.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  companyForm: FormGroup;

  documentTypes: DocumentType[];
  
  constructor(private fb: FormBuilder, private translateService : TranslateService, 
    private location : Location, private router : Router, private commonService : CommonService) {

    this.translateService.get([
        'common.documentId',
        'common.foreignerId',
        'common.tin',
        'common.passport',
        'common.identityCard'
      ]).subscribe(result => {
        this.documentTypes = [
          { Id: 1, Name: result['common.documentId']},
          { Id: 2, Name: result['common.foreignerId']},
          { Id: 3, Name: result['common.tin']},
          { Id: 4, Name: result['common.passport']},
          { Id: 5, Name: result['common.identityCard']},
        ];
    });
  }

  ngOnInit() {
    this.companyForm = this.fb.group({
      tin: ['', [Validators.required]],
      businessName: ['', [Validators.required]],
      contactName: ['', [Validators.required]],
      contactPosition: ['', [Validators.required]],
      contactEmail: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      cellPhoneNumber: ['', [Validators.required]],
      selectDocument : ['', Validators.required]
    });
  }

  goBack() : void {
    this.location.back();
  }

  saveCompany() {
    ////TODO : consume API
    this.redirectToCompany();
  }

  redirectToCompany() {
    this.commonService.setSelectedTab(1);
    this.router.navigate(['/home']);
  }

}
