import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
    MatInputModule, 
    MatButtonModule, 
    MatTableModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDividerModule,
    MatListModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatStepperModule,
    MatCardModule,
    MatTooltipModule
} from '@angular/material';

@NgModule({
    imports: [
      CommonModule,
      MatInputModule,
      MatButtonModule,
      MatTableModule,
      MatProgressBarModule,
      MatPaginatorModule,
      MatSortModule,
      MatDialogModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatIconModule,
      ReactiveFormsModule,
      MatSelectModule,
      MatCheckboxModule,
      MatDividerModule,
      MatListModule,
      MatSnackBarModule,
      MatTabsModule,
      MatToolbarModule,
      MatStepperModule,
      MatCardModule,
      MatTooltipModule
    ],
    exports: [
      MatInputModule,
      MatButtonModule,
      MatTableModule,
      MatProgressBarModule,
      MatPaginatorModule,
      MatSortModule,
      MatDialogModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatIconModule,
      ReactiveFormsModule,
      MatSelectModule,
      MatCheckboxModule,
      MatDividerModule,
      MatListModule,
      MatSnackBarModule,
      MatTabsModule,
      MatToolbarModule,
      MatStepperModule,
      MatCardModule,
      MatTooltipModule
    ]
  })
  export class MaterialModule { }