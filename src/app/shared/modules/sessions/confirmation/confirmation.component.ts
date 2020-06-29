import { Component, OnInit, ViewChild } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { UserService } from 'app/shared/services/user.service';
import { PasswordConfirmationValidation } from 'app/shared/validators/password_confirmation.validator';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  animations: egretAnimations,
  providers: [NgxSpinnerService],
})
export class ConfirmationComponent implements OnInit {
  public form: FormGroup;
  public responseErrorMessage: string;
  public token: string = null;
  currentState: any;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.currentState = 'Wait';
  }

  ngOnInit() {
    this.spinner.show();
    this.buildForm();

    this.activatedRoute.params.subscribe((params) => {
      this.token = params.token;
      this.verifyToken();
    });
  }

  private verifyToken() {
    this.userService.validPasswordToken(this.token).subscribe(
      (response) => {
        this.spinner.hide();
        this.currentState = 'Verified';
        this.form.patchValue({ email: response['email'] });
      },
      () => {
        this.spinner.hide();
        this.currentState = 'NotVerified';
      }
    );
  }

  public buildForm() {
    const password = new FormControl('', [Validators.required]);
    const passwordConfirmation = new FormControl('', Validators.required);
    const isTCAccepted = new FormControl('', Validators.requiredTrue);

    const email = new FormControl({
      value: '',
      disabled: true,
    });

    this.form = new FormGroup(
      {
        email,
        password,
        password_confirmation: passwordConfirmation,
        isTCAccepted,
      },
      [PasswordConfirmationValidation]
    );
  }

  get isTCAccepted() {
    return this.form.get('isTCAccepted');
  }

  public onSubmit() {
    if (this.form.valid) {
      this.responseErrorMessage = '';

      this.userService.confirmationUser(this.form.value.password, this.token).subscribe(
        () => {
          this.router.navigateByUrl('/sessions/sign_in');
        },
        (response) => {
          this.responseErrorMessage = response['error']['message'];
        }
      );
    }
  }
}
