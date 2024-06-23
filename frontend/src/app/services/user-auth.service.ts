import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';

import { ISigninUser, IState, IUser, initial_State } from '../types/user.types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  $state = signal<IState>(initial_State);

  readonly #http = inject(HttpClient);

  constructor() {
    effect(() => {
      localStorage.setItem('SD555_FINAL_PROJECT', JSON.stringify(this.$state()));
    });
  }

  // http method for auth
  userSignup(newUser: IUser) {
    return this.#http.post<{ success: boolean, data: IUser; }>
      (environment.BACKEND_SERVER_URL + '/users/signup', newUser);
  }

  userSignin(user: ISigninUser) {
    return this.#http.post<{ success: boolean, data: string; }>
      (environment.BACKEND_SERVER_URL + '/users/signin', user);
  }

  is_logged_in() {
    return this.$state()._id ? true : false;
  }
}
