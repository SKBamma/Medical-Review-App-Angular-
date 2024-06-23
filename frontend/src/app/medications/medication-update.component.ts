import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ToastrService } from 'ngx-toastr';

import { IMedication } from '../types/medications.types';
import { MedicationService } from '../services/medication.service';



@Component({
  selector: 'app-update-medication',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule,
    MatCardModule, NgClass, MatFormFieldModule, MatInputModule],
  template: `
<form  [ngClass]="['example-form']" [formGroup]="form" (ngSubmit)="onUpdate()">
<h2 [ngClass]="['header']">Edit Medicine</h2>
<mat-form-field [ngClass]="['example-full-width']">
      <mat-label>Medicine Name</mat-label>
      <input type="text" matInput formControlName="name" placeholder="Ex. Acetaminophen">
    </mat-form-field>

    <mat-form-field [ngClass]="['example-full-width']">
      <mat-label>Medicine's Generic Name</mat-label>
      <input type="text" matInput formControlName="generic_name" placeholder="Ex. acetaminophen (oral)">
    </mat-form-field>

    <mat-form-field [ngClass]="['example-full-width']">
      <mat-label>Medication Class</mat-label>
      <input type="text" matInput formControlName="medication_class" placeholder="Ex. Miscellaneous analgesics">
    </mat-form-field>

    <mat-form-field [ngClass]="['example-full-width']">
      <mat-label>Medication Availability</mat-label>
      <input type="text" matInput formControlName="availability" placeholder="Ex. Prescription or OTC">
    </mat-form-field>

    <input [ngClass]="['fileInput']" type="file" formControlName="image" (change)="setFile($event)"> 

    <div [ngClass]="['example-button-row']">
     <button mat-flat-button type="submit" [disabled]="form.invalid">Submit</button> 
    </div> 
    
</form>

  `,

  styleUrl: '../css/update.meds.css'
})
export class UpdateMedicationComponent {
  readonly #router = inject(Router);
  readonly medService = inject(MedicationService);
  readonly #notification = inject(ToastrService);

  file!: File;
  form = inject(FormBuilder).group({
    _id: '',
    name: ['', [Validators.required, Validators.minLength(3)]],
    generic_name: ['', [Validators.required, Validators.minLength(3)]],
    medication_class: ['', [Validators.required, Validators.minLength(3)]],
    availability: ['', [Validators.required, Validators.minLength(3)]],
    image: ['', [Validators.required]],
  });

  setFile(event: Event) {
    this.file = (event.target as HTMLInputElement).files![0];
  }

  // receive medication state
  medication = this.#router.getCurrentNavigation()?.extras.state as IMedication;

  constructor() {
    if (this.medication) {
      this.form.patchValue({
        _id: this.medication._id,
        name: this.medication.name,
        generic_name: this.medication.generic_name,
        medication_class: this.medication.medication_class,
        availability: this.medication.availability,
        image: this.medication.image._id,
      });
    }
  }

  onUpdate() {
    console.log("ffgft", this.medication);
    const formData = new FormData();
    formData.append('_id', this.form.get('_id')?.value as string);
    formData.append('name', this.form.get('name')?.value as string);
    formData.append('generic_name', this.form.get('generic_name')?.value as string);
    formData.append('medication_class', this.form.get('medication_class')?.value as string);
    formData.append('availability', this.form.get('availability')?.value as string);
    formData.append('medication_image', this.file);


    this.medService.updateMedicationById(formData)
      .subscribe(response => {

        // update state navigate to list
        if (response.success) {
          this.#notification.success(`Medicine was updated successfully!`);
          this.#router.navigate(['', 'medications', 'list-medications']);
        } else {
          this.#notification.error(`Something went wrong, unable to update!`);
          this.#router.navigate(['', 'medications', 'list-medications']);
        }
      });
  }
  goBack() {
    this.#router.navigate(['', 'medications', 'list-medications']);
  }

}
