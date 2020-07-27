const Many = require('extends-classes');

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { FormControlsHelper } from 'app/shared/helpers/form_controls.helper';
import { FormBaseComponent } from 'app/shared/components/form.base.component';
import { ApplicationBaseComponent } from 'app/shared/components/application.base.component';
import { PasswordConfirmationValidation } from 'app/shared/validators/password_confirmation.validator';
import { UserSession } from 'app/shared/services/user-session';
import { UserEntityModel } from 'app/shared/models/users/user.entity.model';
import { UserModel } from 'app/shared/models/users/user.model';
import { UserWithCompanyFormHepler } from 'app/shared/helpers/user_with_company_form.helper';
import { UserService } from 'app/shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent
      extends Many(ApplicationBaseComponent, FormBaseComponent)
      implements OnInit {

  public form: FormGroup;
  public governmentIdTypes: any = [];
  public user: any = new UserModel({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService) {
    super();
  }

  ngOnInit() {
    this.buildForm();
  }

  public buildForm() {
    this.user = UserEntityModel.getUserInstance(this.currentUser);
    const password = new FormControl('');
    const passwordConfirmation = new FormControl('');

    let companyFields = {};
    if(this.user.isCompanyShown){
      companyFields = UserWithCompanyFormHepler.companyFields(
        this.user.company,
        { disabledName: true, isBillingShownToUI: this.user.isBillingShownToUI() }
      );
    }

    this.form = new FormGroup({
      is_billing_function_shown: new FormControl(this.user.isBillingFunctionShown, []),
      user: new FormGroup({
        id: new FormControl(this.user.id, []),
        name: new FormControl({ value: this.user.name, disabled: true }, [Validators.required]),
        email: new FormControl({ value: this.user.email, disabled: true }, [Validators.required]),
        phone_number: new FormControl(this.user.phone_number, [Validators.required]),
        phone_country: new FormControl(this.user.phone_country || 'CR', [Validators.required]),
        secondary_phone_number: new FormControl(this.user.secondary_phone_number),
        secondary_phone_country: new FormControl(this.user.secondary_phone_country || 'CR'),
        role: new FormControl({ value: this.user.roleName(), disabled: true })
      }),

      password: password,
      password_confirmation: passwordConfirmation,
      company: new FormGroup(companyFields)
    }, [PasswordConfirmationValidation]);
  }

  public submit() {
    let params = UserWithCompanyFormHepler.getFormValueForUserAndCompanyForm(this.form);

    if (this.form.valid) {
      if (this.form.value.password === '') {
        delete this.form.value.password;
        delete this.form.value.password_confirmation;
      }

      this.userService.update(
        this.user.id, this.form.value
      ).subscribe(
        (response) => {
          UserSession.setCurrentUser(response['data']['attributes']);
          this.router.navigateByUrl('/dashboard/profile?message=UPDATED_PROFILE_MESSAGE');
        },
        (response) => {
          this.showFlashFailed(response['error']['errors'], { scrollToTop: true });
        }
      );
    }
  }
}
