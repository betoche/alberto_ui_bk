import { Routes } from '@angular/router';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SigninComponent } from './signin/signin.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';

export const SessionsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign_in',
        component: SigninComponent,
        data: { title: 'SIGN_IN' }
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: { title: 'FORGOT_PASSWORD' }
      },
      {
        path: 'reset-password/:token',
        component: ResetPasswordComponent,
        data: { title: 'SET_PASSWORD' }
      },
      {
        path: 'confirmation/:token',
        component: ConfirmationComponent,
        data: { title: 'VERIFY_ACCOUNT' }
      },
      {
        path: '404',
        component: NotFoundComponent,
        data: { title: 'NOT_FOUND' }
      },
      {
        path: 'error',
        component: ErrorComponent,
        data: { title: 'ERROR' }
      }
    ]
  }
];
