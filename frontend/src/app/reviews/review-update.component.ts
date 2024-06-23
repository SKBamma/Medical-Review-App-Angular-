import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { IMedication, IReview } from '../types/medications.types';
import { ReviewService } from '../services/review.service';
import { MedicationService } from '../services/medication.service';


@Component({
  selector: 'app-update-review',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass,
    MatFormFieldModule
  ],
  template: `
    <form  [ngClass]="['example-form']" [formGroup]="form" (ngSubmit)="submitReviewUpdate()">
        <h3 [ngClass]="['updateReview']" >Update Review</h3>
      <mat-form-field [ngClass]="['example-full-width']">
      <mat-label>Write Review</mat-label>
      <input type="text" matInput formControlName="review" placeholder="Ex. Helped to reduce pain!">
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

  styleUrl: '../css/update.review.css'
})

export class UpdateReviewComponent {
  reviewService = inject(ReviewService);
  medicationService = inject(MedicationService);
  readonly #router = inject(Router);
  readonly #notification = inject(ToastrService);


  reviews!: IReview;
  medication!: { med: IMedication, reviews: IReview; };

  form = inject(FormBuilder).group({
    review: ['', Validators.required],
    rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]]
  });

  constructor() {
    const navigation = this.#router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.reviews = (navigation.extras.state as any)['review'] as IReview;
      this.medication = navigation.extras.state as any['med'] as { med: IMedication, reviews: IReview; };
      if (this.reviews && this.medication) {
        this.form.patchValue({
          review: this.reviews.review,
          rating: this.reviews.rating
        });
      }
    }

  }
  submitReviewUpdate() {
    if (this.form.valid) {
      this.reviewService.updateReview(this.medication.med._id, this.reviews._id, this.form.value as { review: string, rating: number; })
        .subscribe(response => {
          if (response.success) {
            this.#notification.success('Review updated successfully');
            this.#router.navigate(['medications', 'details']);
          } else {
            this.#notification.error('Failed to update review');
          }
        });
    }
  }
}
