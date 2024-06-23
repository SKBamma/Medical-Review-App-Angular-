import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgClass } from '@angular/common';

import { ToastrService } from 'ngx-toastr';

import { UserAuthService } from '../services/user-auth.service';
import { IUser } from '../types/user.types';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule,
    MatFormFieldModule, NgClass, MatButtonModule],
  template: `
   <form  [ngClass]="['example-form']" [formGroup]="form" (ngSubmit)="OnSignUp()">
    <h3 [ngClass]="['header']" >Please Sign up</h3>
    <mat-form-field [ngClass]="['example-full-width']">
      <mat-label>Full Name</mat-label>
      <input type="text" matInput formControlName="fullname" placeholder="Ex. suresh bamma">
    </mat-form-field>

    <mat-form-field [ngClass]="['example-full-width']">
      <mat-label>Email</mat-label>
      <input type="text" matInput formControlName="email" placeholder="Ex. sb@miu.edu">
    </mat-form-field>

    <mat-form-field [ngClass]="['example-full-width']">
      <mat-label>Password</mat-label>
      <input type="password" matInput formControlName="password" placeholder="Strong password suggested">
     </mat-form-field>

    <div [ngClass]="['example-button-row']">
     <button mat-flat-button type="submit" [disabled]="form.invalid">Submit</button> 
    </div>
  </form>

  `,

  styleUrl: '../css/signup.component.css'

})
export class SignupComponent {
  readonly #userAuthService = inject(UserAuthService);
  readonly #notification = inject(ToastrService);
  readonly #router = inject(Router);

  form = inject(FormBuilder).group({
    fullname: ['', [Validators.required,]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  OnSignUp() {
    console.log("Hello from sign up");
    this.#userAuthService.userSignup(this.form.value as IUser).subscribe(response => {
      if (response.success) {
        this.#notification.success(`Signup Successful!`);
        this.#router.navigate(['signin']);
      } else {
        this.#notification.error(`Unable to signup!`);
      }
    });

  }

};
