import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { ToastrService } from 'ngx-toastr';
import { debounceTime, mergeMap } from 'rxjs';

import { MedicationService } from '../services/medication.service';


@Component({
  selector: 'app-add-medication',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatFormFieldModule, MatIconModule, NgClass],
  template: `
    
    <form  [ngClass]="['example-form']" [formGroup]="form" (ngSubmit)="onAdd()">
  <h2 [ngClass]="['header']">Add Medicine</h2>
   <mat-form-field [ngClass]="['example-full-width']">
      <mat-label>Medicine Name</mat-label>
      <input type="text" matInput formControlName="name" placeholder="Ex. Acetaminophen">
      @if(name.hasError('existed')){
        <p>This med already exist!</p>
      }
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
  styleUrl: '../css/add.meds.css'

})
export class AddMedicationComponent {
  readonly medService = inject(MedicationService);
  readonly #router = inject(Router);
  readonly #notification = inject(ToastrService);

  file!: File;
  form = inject(FormBuilder).nonNullable.group({
    name: ['',
      {
        validators: [Validators.required],
        updateOn: 'change'
      }],
    generic_name: ['', [Validators.required]],
    medication_class: ['', [Validators.required]],
    availability: ['', [Validators.required]],
    image: ['', [Validators.required]],
  });

  setFile(event: Event) {
    this.file = (event.target as HTMLInputElement).files![0];
  }

  // async validators
  get name() {
    return this.form.controls.name;
  }

  constructor() {
    this.name.valueChanges.pipe(
      debounceTime(1000),
      mergeMap((name) => this.medService.verifyMedExisted({
        med_name: name
      })
      )).subscribe((response) => {
        this.name.setErrors(response);
      });
  }



  onAdd() {
    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value as string);
    formData.append('generic_name', this.form.get('generic_name')?.value as string);
    formData.append('medication_class', this.form.get('medication_class')?.value as string);
    formData.append('availability', this.form.get('availability')?.value as string);
    formData.append('medication_image', this.file);

    this.medService.addMedication(formData)
      .subscribe(response => {
        if (response.success) {
          //updateState
          this.medService.addMedicationFromState(response.data);
          this.#notification.success("Medication added successfully!");
          this.#router.navigate(['', 'medications', 'list-medications']);
        } else {
          this.#notification.error("Unable to add medication!");
        }
      });
  }
}
