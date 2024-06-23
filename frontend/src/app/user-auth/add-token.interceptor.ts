import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { UserAuthService } from '../services/user-auth.service';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userAuthService = inject(UserAuthService);
  if (userAuthService.is_logged_in()) {
    const reqWithToken = req.clone(
      {
        headers: req.headers.set(
          'Authorization',
          `Bearer ${userAuthService.$state().jwt}`)
      });
    return next(reqWithToken);
  }
  return next(req);
};
