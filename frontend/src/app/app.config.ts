import { APP_INITIALIZER, ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideToastr } from 'ngx-toastr';

import { addTokenInterceptor } from './user-auth/add-token.interceptor';
import { UserAuthService } from './services/user-auth.service';
import { routes } from './routes/app.routes';

const bootstrap = () => {
  const authService = inject(UserAuthService);
  return () => {
    const persisted_state = localStorage.getItem("SD555_FINAL_PROJECT");
    if (persisted_state) {
      authService.$state.set(JSON.parse(persisted_state));
    }
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([addTokenInterceptor])),
    provideToastr(),
    provideAnimationsAsync(),
    { provide: APP_INITIALIZER, multi: true, useFactory: bootstrap }
  ]

};
