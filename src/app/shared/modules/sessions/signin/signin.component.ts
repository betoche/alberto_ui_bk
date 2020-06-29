import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

import { egretAnimations } from 'app/shared/animations/egret-animations';

import { UserService } from 'app/shared/services/user.service';
import { UserSession } from 'app/shared/services/user-session';
import { DialogService } from 'app/shared/services/dialog.service';

@Component({
  selector: 'app-signin4',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  animations: egretAnimations
})
export class SigninComponent implements OnInit {
  public signinForm: FormGroup;
  public responseErrorMessage: string;
  public hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    const password = new FormControl('', Validators.required);

    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: password
    });
  }

  public openForgotPasswordPopUp() {
    this.dialogService.openPopUp(this, ForgotPasswordComponent, {
      data: { title: 'FORGOT_PASSWORD' },
      width: '598px',
      handleResponse: () => {}
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      let fcmToken = UserSession.getFcmToken();

      this.responseErrorMessage = '';

      this.userService
        .signIn(this.signinForm.value.email, this.signinForm.value.password, { fcm_token: fcmToken })
        .subscribe(
          response => {
            let user = response['data']['attributes'];
            UserSession.setCurrentUser(user);
            if(user.completed_profile){
              this.router.navigateByUrl('dashboard');
            }else{
              this.router.navigateByUrl('dashboard/edit_profile');
            }
          },
          response => {
            UserSession.removeCurrentUser();

            const validationErrors = response.error.message;
            this.responseErrorMessage = response.error.message;
            Object.keys(validationErrors).forEach(prop => {
              const formControl = this.signinForm.get(prop);
              if (formControl) {
                formControl.setErrors({
                  serverError: validationErrors[prop]
                });
              }
            });
          }
        );
    }
  }
}
