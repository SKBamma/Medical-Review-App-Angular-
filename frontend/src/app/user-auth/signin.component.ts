import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';


import { jwtDecode } from "jwt-decode";
import { ToastrService } from 'ngx-toastr';

import { UserAuthService } from '../services/user-auth.service';
import { ISigninUser, IState } from '../types/user.types';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, NgClass, MatIconModule],
  template: `  
   <form  [ngClass]="['example-form']" [formGroup]="form" (ngSubmit)="onSignIn()">
   <h3 [ngClass]="['header']" >Welcome to signin</h3>
   <mat-form-field [ngClass]="['example-full-width']">
      <mat-label>Email</mat-label>
      <input type="text" matInput formControlName="email" placeholder="Ex. sb@miu.edu">
    </mat-form-field>

    <mat-form-field [ngClass]="['example-full-width']">
      <mat-label>Password</mat-label>
      <input type="password" matInput formControlName="password" placeholder="Ex. oewrerbvc@2145%">
     </mat-form-field>

    <div [ngClass]="['example-button-row']">
     <button mat-flat-button type="submit" [disabled]="form.invalid">Login</button> 
    </div>

   </form>
  `,

  styleUrl: '../css/signin.component.css'

})
export class SigninComponent {
  readonly #userAuthService = inject(UserAuthService);
  readonly #notification = inject(ToastrService);
  readonly #router = inject(Router);

  form = inject(FormBuilder).group({
    email: ['', [Validators.required, Validators.email],],
    password: ['', [Validators.required, Validators.minLength(5)],]
  });

  onSignIn() {
    this.#userAuthService.userSignin(this.form.value as ISigninUser).subscribe({
      next: response => {
        if (response.success) {
          const decoded_token = jwtDecode(response.data) as IState;
          //save the state
          this.#userAuthService.$state.set({
            _id: decoded_token._id,
            fullname: decoded_token.fullname,
            email: decoded_token.email,
            jwt: response.data
          });
          this.#notification.success(`Signin was successful!`);
          this.#router.navigate(['', 'medications', 'list-medications']);
        }

      },
      error: error => {
        this.#notification.error(`Invalid user or password!`);
      }

    });
  }

}
