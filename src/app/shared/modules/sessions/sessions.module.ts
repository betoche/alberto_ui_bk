import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { DialogService } from 'app/shared/services/dialog.service';
import { SharedModule } from 'app/shared/shared.module';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SigninComponent } from './signin/signin.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { SessionsRoutes } from './sessions.routing';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    SharedModule,
    RouterModule.forChild(SessionsRoutes),
    TranslateModule,
    NgxSpinnerModule,
  ],
  declarations: [
    ForgotPasswordComponent,
    SigninComponent,
    NotFoundComponent,
    ErrorComponent,
    ResetPasswordComponent,
    ConfirmationComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DialogService],
})
export class SessionsModule {}
