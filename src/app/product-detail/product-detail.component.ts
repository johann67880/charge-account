import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common-service.service';
import { ProductDetailStepModel } from '../models/productDetailStep.model';
import { TranslateService } from '@ngx-translate/core';

declare var require: any;

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productForm: FormGroup;
  totalConcepts : number = 0;
  countConcepts : number = 0;
  writtenNumber : any;
  totalConceptsText : string = "";
  conceptsModel : ProductDetailStepModel = new ProductDetailStepModel();

  constructor(private fb: FormBuilder, private commonService : CommonService, private translateService : TranslateService) { }

  ngOnInit() {
    this.writtenNumber = require('written-number');
    this.writtenNumber.defaults.lang = 'es';
    this.totalConceptsText = this.writtenNumber(this.totalConcepts);

    let newForm = this.fb.group({
      defaultName: ['', [Validators.required]],
      defaultPrice: ['', [Validators.required]],
      formArray: this.fb.array([])
    });

    this.productForm = newForm;

    this.productForm.valueChanges.subscribe( data => {

      this.totalConcepts = (this.productForm.controls.defaultPrice.value) ? parseFloat(this.productForm.controls.defaultPrice.value) : 0;
      this.countConcepts = (this.productForm.controls.defaultName.value && this.productForm.controls.defaultPrice.value) ? 1 : 0;

      let validConcepts = [];
      
      if(this.productForm.controls.defaultName.value && this.productForm.controls.defaultPrice.value) { 
        validConcepts.push({Name: this.productForm.controls.defaultName.value, Price : this.productForm.controls.defaultPrice.value});
      }

      let dynamicConcepts = this.productForm.controls.formArray.value.filter(x => x.Name !== "" && x.Price !== "");
      
      if(dynamicConcepts.length > 0) {
        
        for(let item of dynamicConcepts) {
          validConcepts.push({Name : item.Name, Price : item.Price});
        }

        this.totalConcepts = validConcepts.reduce((sum, current) => sum + parseFloat(current.Price), 0);
        this.countConcepts = (validConcepts) ? validConcepts.length : 0;
      }

      this.totalConceptsText = this.writtenNumber(this.totalConcepts) + " " + this.translateService.instant("common.coinName");

      this.conceptsModel.Concepts = validConcepts;
      this.conceptsModel.Description = "";
      this.conceptsModel.Total = this.totalConcepts;
      this.conceptsModel.TotalText = this.totalConceptsText;

      this.commonService.setConcepts(this.conceptsModel);
    });
  }

  addInput(): void {
    const arrayControl = <FormArray>this.productForm.controls['formArray'];
    
    let newGroup = this.fb.group({
      Name: ['', [Validators.required]],
      Price: ['', [Validators.required]]
    });

    arrayControl.push(newGroup);
  }

  deleteInput(index: number): void {
    const arrayControl = <FormArray>this.productForm.controls['formArray'];
    arrayControl.removeAt(index);
  }
}
