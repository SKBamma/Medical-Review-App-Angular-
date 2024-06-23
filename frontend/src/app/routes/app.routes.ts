import { Router, Routes } from '@angular/router';
import { inject } from '@angular/core';

import { UserAuthService } from '../services/user-auth.service';
import { ListMedicationsComponent } from '../medications/medications-list.component';

const signedIn = () => {
    const isLoggedIn = inject(UserAuthService).is_logged_in();
    const router = inject(Router);
    if (isLoggedIn) {
        router.navigate(['', 'list-medications']);
        return false;
    } else {
        return true;
    }
};

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'list-medications',
        pathMatch: 'full',
    },
    {
        path: 'list-medications',
        component: ListMedicationsComponent,
    },
    {
        path: 'signin',
        loadComponent: () => import('../user-auth/signin.component').then(c => c.SigninComponent),
        canActivate: [() => signedIn()],
        title: "User Signin"
    },
    {
        path: 'signup',
        loadComponent: () => import('../user-auth/signup.component').then(c => c.SignupComponent),
        canActivate: [() => signedIn()],
        title: "Guest Signup"
    },
    {
        path: 'medications',
        loadChildren: () => import('../routes/medications.routes')
            .then(r => r.medication_Routes)
    },

    {
        path: '**',
        redirectTo: 'list-medications'
    }
];
