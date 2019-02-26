import { Injectable } from '@angular/core';
import { CompanyStepModel } from '../models/companyStep.model';
import { ProductDetailStepModel } from '../models/productDetailStep.model';

@Injectable()
export class CommonService {
  private selectedTab : number = 0;
  
  private companyStepModel : CompanyStepModel;
  private conceptsModel : ProductDetailStepModel;


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
}
