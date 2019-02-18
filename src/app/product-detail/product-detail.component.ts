import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    let newForm = this.fb.group({
      defaultName: ['', [Validators.required]],
      defaultPrice: ['', [Validators.required]],
      formArray: this.fb.array([])
    });

    this.productForm = newForm;
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
