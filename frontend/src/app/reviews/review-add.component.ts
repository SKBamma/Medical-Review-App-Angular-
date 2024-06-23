import { Component, inject, } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ToastrService } from 'ngx-toastr';

import { IMedication, IReview } from '../types/medications.types';
import { MedicationService } from '../services/medication.service';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, MatFormFieldModule,],

  template: `

      <form  [ngClass]="['example-form']" [formGroup]="form" (ngSubmit)="submitReview()">

        <h3 [ngClass]="['addReview']" >Add Review</h3>
      <mat-form-field [ngClass]="['example-full-width']">
      <mat-label>Write Review</mat-label>
      <input type="text" matInput formControlName="review" placeholder="Ex. Helped to reduce pain!">
      @if(review.invalid && review.touched && review.dirty){
        @if(review.errors?.['revienotstring']){
          <p>Review must have meaning</p>
        }
      }
      </mat-form-field>

      <mat-form-field [ngClass]="['example-full-width']">
      <mat-label>Rating out of 5</mat-label>
      <input type="number" matInput formControlName="rating" placeholder="Ex. 1-5!">
      </mat-form-field>

      <div [ngClass]="['example-button-row']">
       <button mat-flat-button type="submit" [disabled]="form.invalid">Submit</button> 
      </div>

      </form>

  `,
  styleUrl: '../css/add.review.css'
})
export class AddReviewComponent {
  readonly reviewService = inject(ReviewService);
  readonly #router = inject(Router);
  readonly #notification = inject(ToastrService);
  readonly medService = inject(MedicationService);

  // receive medications
  medications = this.#router.getCurrentNavigation()?.extras.state as IMedication;

  form = inject(FormBuilder).nonNullable.group({
    review: ['', [Validators.required, this.reviewNotNumber],],
    rating: [1, [Validators.required, Validators.min(1), Validators.max(5)],]
  });

  get review() {
    return this.form.controls.review;
  }

  // custom validators for review
  reviewNotNumber(control: AbstractControl) {
    const value = control.value;
    if (typeof value !== 'string') {
      return { 'revienotstring': true };
    } else {
      return null;
    }
  }

  submitReview() {
    this.reviewService.addReview(this.medications._id, this.form.value as IReview)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.reviewService.$reviewState.set(this.form.value as IReview[]);
            this.medService.$medication_state.update((preMedications) =>
              preMedications.map((meds) => {
                if (meds._id === this.medications._id) {
                  return {
                    ...meds,
                    reviews: [...(meds.reviews || []), this.form.value as IReview]
                  };
                } else {
                  return meds;
                }
              }
              )
            );
            this.#notification.success("Review was addeded successfully!");
            this.#router.navigate(['', 'medications', 'list-medications']);
          } else {
            this.#notification.error(`unable to add review`);
            this.#router.navigate(['', 'medications', 'list-medications']);
          }
        },
        error: (error) => {
          this.#notification.error(`unable to add review`, error);
        }
      });

  }
}



