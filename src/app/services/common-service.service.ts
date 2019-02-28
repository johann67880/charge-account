import { Injectable } from '@angular/core';
import { CompanyStepModel } from '../models/companyStep.model';
import { ProductDetailStepModel } from '../models/productDetailStep.model';

@Injectable()
export class CommonService {
  public selectedTab : number = 0;
  
  public companyStepModel : CompanyStepModel;
  public conceptsModel : ProductDetailStepModel;
  public billingId : string;


  getSelectedTab() {
    return this.selectedTab;
  }

  setSelectedTab(index : number) {
    this.selectedTab = index;
  }

  getSelectedCompany() {
    return this.companyStepModel;
  }

  setSelectedCompany(company : CompanyStepModel) {
    this.companyStepModel = company;
  }

  getConcepts() {
    return this.conceptsModel;
  }

  setConcepts(concepts : ProductDetailStepModel) {
    this.conceptsModel = concepts;
  }

  getBillingId() {
    return this.billingId;
  }

  setBillingId(value : string) {
    this.billingId = value;
  }
}
