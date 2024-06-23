import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardHeader, MatCardModule, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

import { ToastrService } from 'ngx-toastr';

import { MedicationService } from '../services/medication.service';
import { IMedication } from '../types/medications.types';
import { UserAuthService } from '../services/user-auth.service';


@Component({
  selector: 'app-list-medications',
  standalone: true,
  imports: [NgClass, MatToolbarModule, MatCardHeader,
    MatCardTitle, MatCardSubtitle, MatButtonModule, MatCardModule, MatIconModule],

  template: `
  <div class="example-button-row">
  <mat-card>
  <mat-card-header>
    <br>
    <mat-card-title>Welcome to {{userAuthService.$state().fullname}}!</mat-card-title>
  </mat-card-header>
  <mat-card-content>
   <br><br><br><br><br><br>
  @for (char of capsLetter; track char) {
      <button mat-stroked-button (click)="fetchMeds(char)"  >
           {{char}} 
      </button>
    }
  </mat-card-content>
  </mat-card>
   
  <ul>
        @for (med of medicineService.$medication_state(); track med._id) {
          <li > 
            <a  (click)="navigateToMedDetails(med)" [ngClass]="['medicine']" > <h4>{{med.name}}</h4>
           </a>
          </li>
        }
  </ul>
 
  </div>
   
  `,

  styleUrl: `../css/list.meds.css`

})


export class ListMedicationsComponent {
  readonly userAuthService = inject(UserAuthService);
  readonly medicineService = inject(MedicationService);
  readonly #notification = inject(ToastrService);
  readonly #router = inject(Router);

  letters = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z';
  capsLetter = this.letters.toUpperCase().split(',');

  fetchMeds(char: string) {
    this.medicineService.getMedications(char).subscribe((response) => {
      if (response.data.length === 0) {
        this.#notification.error("Medication out of stock!");
      } else {
        this.medicineService.$medication_state.set(response.data);
        // this.#notification.success("Medicine found successfully");
      }
    });
  }

  navigateToMedDetails(med: IMedication) {
    this.#router.navigate(['', 'medications', 'medication-details'], { state: med });
  }
}
