import { Component, OnInit } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'app/shared/services/user.service';
import { PasswordConfirmationValidation } from 'app/shared/validators/password_confirmation.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: egretAnimations
})
export class ResetPasswordComponent implements OnInit {
  public form: FormGroup;
  public responseErrorMessage: string;
  public token: string;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.token = this.activatedRoute.snapshot.params.token;
  }

  ngOnInit() {
    const password = new FormControl('', [Validators.required]);
    const passwordConfirmation = new FormControl('', Validators.required);

    this.form = new FormGroup(
      {
        password: password,
        password_confirmation: passwordConfirmation
      },
      [PasswordConfirmationValidation]
    );
  }

  public onSubmit() {
    if (this.form.valid) {
      this.responseErrorMessage = '';

      this.userService.resetPassword(this.form.value.password, this.token).subscribe(
        () => {
          this.router.navigateByUrl('/sessions/sign_in');
        },
        response => {
          this.responseErrorMessage = response['error']['message'];
        }
      );
    }
  }
}
