import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

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
      this.countConcepts = (this.productForm.controls.defaultName.value) ? 1 : 0;

      let validConcepts = this.productForm.controls.formArray.value.filter(x => x.dynamicName !== "" && x.dynamicPrice !== "");
      this.totalConcepts += validConcepts.reduce((sum, current) => sum + parseFloat(current.dynamicPrice), 0);
      this.countConcepts += (validConcepts) ? validConcepts.length : 0;

      this.totalConceptsText = this.writtenNumber(this.totalConcepts);
    });
  }

  addInput(): void {
    const arrayControl = <FormArray>this.productForm.controls['formArray'];
    
    let newGroup = this.fb.group({
      dynamicName: ['', [Validators.required]],
      dynamicPrice: ['', [Validators.required]]
    });

    arrayControl.push(newGroup);
  }

  deleteInput(index: number): void {
    const arrayControl = <FormArray>this.productForm.controls['formArray'];
    arrayControl.removeAt(index);
  }
}
