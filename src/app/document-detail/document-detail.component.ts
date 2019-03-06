import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserDocument } from '../models/document.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  tempUserDocument : UserDocument;
  form: FormGroup;
  invalidForm : boolean = false;

  constructor(public dialogRef: MatDialogRef<DocumentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDocument, private formBuilder : FormBuilder) {
      this.tempUserDocument = data;
    }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Name: ['', Validators.required]
    });

    this.form.controls.Name.setValue(this.tempUserDocument.Name);

    this.form.valueChanges.subscribe(result => {
      this.invalidForm = this.form.invalid;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateDocument() {
    if(!this.invalidForm) {
      ////TODO : consumes API to update document and after close the dialog.
      this.dialogRef.close();
    }
  }

}
