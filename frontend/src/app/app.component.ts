import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatCardHeader, MatCardTitle, MatCardSubtitle } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { UserAuthService } from './services/user-auth.service';
import { initial_State } from './types/user.types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass, MatToolbarModule, MatCardHeader,
    MatCardTitle, MatCardSubtitle, MatButtonModule, MatCardModule, MatIconModule],
  template: `
    
    
  @if(userAuthService.is_logged_in()){
    <header [ngClass]="['header']">
      <nav>
      <a [routerLink]="['',  'list-medications']" >Medication list</a> 
      <a [routerLink]="['', 'medications','add-medication']">Add Medication</a> 
      <a type="submit" (click)="onLogout()">Logout</a>  
      </nav>
    </header>
  }@else {
    
    <div [ngClass]="['header2']">
      <span [routerLink]="['list-medications']">
        Suresh Medical Group
      </span>
      <span [ngClass]="['spacer']"></span>
      <span>
      <button mat-button [routerLink]="['signup']">Register</button>
      <button mat-button [routerLink]="['signin']">Sign In</button>
      </span>
    </div>
  }
  
    <router-outlet />
  `,

  styleUrl: './css/app.css'

})

export class AppComponent {
  readonly userAuthService = inject(UserAuthService);
  readonly #router = inject(Router);


  onLogout() {
    this.userAuthService.$state.set(initial_State);
    this.#router.navigate(['', 'medications', 'list-medications']);
  }
}
