import { Component, effect, inject, } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ToastrService } from 'ngx-toastr';

import { IMedication, IReview } from '../types/medications.types';
import { MedicationService } from '../services/medication.service';
import { UserAuthService } from '../services/user-auth.service';
import { ReviewService } from '../services/review.service';


@Component({
  selector: 'app-medication-details',
  standalone: true,
  imports: [MatButtonModule, MatCardModule,
    NgClass, MatIconModule, DatePipe, UpperCasePipe, RouterLink],
  template: `
    
<mat-card class="example-card">
  <mat-card-header>
      <h2 [ngClass]="['header']">Medicine</h2>
  </mat-card-header>
  <mat-card-content>
    <h5> <img [ngClass]="['image']"
      src="http://localhost:3000/api/medications/images/{{medications.image._id}}">
    </h5>
    <h5>{{medications.name | uppercase}}</h5>
    <h5>Generic Name: {{medications.generic_name}}</h5>
    <h5>Medication Class: {{medications.medication_class}}</h5>
    <h5>Avaliability: {{medications.availability}}</h5>
    <h5>Added By: {{medications.added_by.fullname}}</h5>
    <h4>Reviews: 
      <ol>
      @for (item of medications.reviews; track item._id) {
        <li><h5>{{item.review}}</h5> </li>
        <span>{{item.by.fullname}}</span>
        <span [ngClass]="['editDelete']">
          @if(authService.is_logged_in() && 
              item.by.user_id === this.authService.$state()._id ){
            <button mat-button (click)="onNavigateToEditReview(item, medications)">Edit</button> &nbsp;
            <button mat-button (click)="onReviewDelete(item._id)">Delete</button>
          }
        </span> 
        <p>
          @for (star of generateStar(item.rating); track $index) {
            <mat-icon aria-hidden="false"  fontIcon="star"></mat-icon>
          }
        </p>
        <h5>{{item.date | date}}</h5>
        <br>
      }
      </ol>
    </h4>
    
 </mat-card-content>
 <mat-card-actions [ngClass]="['button']">
  @if(authService.is_logged_in() &&
     medications.added_by.user_id === authService.$state()._id){
      <button mat-raised-button (click)="onUpdate(medications)">Edit</button>
      <button mat-raised-button (click)="ondelete()" >Delete</button>
  }
 
  @if (authService.is_logged_in()) {
    <button mat-raised-button (click)="goToAddReview(medications)">Add Review</button>
  }
    
 </mat-card-actions>
</mat-card>
  `,
  styleUrl: '../css/details.meds.css'

})
export class MedicationDetailsComponent {
  readonly #router = inject(Router);
  readonly medService = inject(MedicationService);
  readonly authService = inject(UserAuthService);
  readonly #notification = inject(ToastrService);
  readonly reviewService = inject(ReviewService);


  medications = this.#router.getCurrentNavigation()?.extras.state as IMedication;

  constructor() {
    effect(() => {
      this.medService.$medication_state();

    });
    if (this.medications._id !== '') {
      this.medService.getMedicationById(this.medications._id)
        .subscribe(response => {
          if (response.success) {
            this.medications = response.data;
          } else {
            this.#notification.error("Something went wong!");
          }
        });
    } else {
      this.#notification.error("Medicine not found");
    }
  }

  ondelete() {
    console.log("ondeletemedications", this.medications);
    this.medService.deleteMedicationById(this.medications._id)
      .subscribe(response => {
        if (response.data) {
          this.#notification.success(`Medicine was deleted successfully!`);
          this.#router.navigate(['', 'medications', 'list-medications']);
          // update state
          this.medService.$medication_state.update(medication =>
            medication.filter(med => med._id !== this.medications._id)
          );
        } else {
          this.#notification.error(`Unauthorized to delete medicine!`);
          this.#router.navigate(['', 'medications', 'list-medications']);
        }

      });
  }

  onUpdate(med: IMedication) {
    if (this.medications.added_by.user_id === this.authService.$state()._id) {
      this.#router.navigate(['', 'medications', 'update-medication'], { state: med });
    } else {
      this.#notification.error(`Unauthorized to update!`);
      this.#router.navigate(['', 'medications', 'list-medications']);
    }
  }

  generateStar(rating: number): number[] {
    return Array.from({ length: rating });
  }
  goToAddReview(med: IMedication) {
    console.log('terst');
    this.#router.navigate(['', 'medications', 'medication-details', 'add-review'],
      { state: med });
  }

  onReviewDelete(review_id: string) {
    this.reviewService.deleteReview(this.medications._id, review_id)
      .subscribe(response => {
        if (response.success) {
          this.#notification.success(`Review was deleted successfully!`);
          this.#router.navigate(['', 'medications']);

        } else {
          this.#notification.success(`Unable to delete review!`);
        }

      });
  }
  onNavigateToEditReview(review: IReview, med: IMedication) {
    this.#router.navigate(['', 'medications', 'medication-details', 'update-review'],
      { state: { review, med } });
  }
}
