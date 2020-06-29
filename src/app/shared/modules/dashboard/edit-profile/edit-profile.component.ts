const Many = require('extends-classes');
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { FormControlsHelper } from 'app/shared/helpers/form_controls.helper';
import { FormBaseComponent } from 'app/shared/components/form.base.component';
import { ApplicationBaseComponent } from 'app/shared/components/application.base.component';
import { PasswordConfirmationValidation } from 'app/shared/validators/password_confirmation.validator';
import { ProfileService } from 'app/shared/services/profile.service';
import { UserSession } from 'app/shared/services/user-session';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent extends Many(ApplicationBaseComponent, FormBaseComponent) implements OnInit {
  public form: FormGroup;
  public governmentIdTypes: any = [];

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
    super();
  }

  ngOnInit() {
    this.buildForm();
  }

  public buildForm() {
    const password = new FormControl('');
    const passwordConfirmation = new FormControl('');

    // TODO: Temporary field, will add later when the feature has confirm
    const companyNameDisabledField = new FormControl({
      value: 'Pragmatic',
      disabled: true,
    });
    const companyRoleDisabledField = new FormControl({
      value: 'Experience Lead',
      disabled: true,
    });

    const name = new FormControl({
      value: this.currentUser.name,
      disabled: true,
    });

    const email = new FormControl({
      value: this.currentUser.email,
      disabled: true,
    });

    const phoneCountry = new FormControl(this.currentUser.phone_country);
    const phoneNumber = new FormControl(this.currentUser.phone_number);

    const SecondaryPhoneCountry = new FormControl(
      this.currentUser.secondary_phone_country,
      Validators.required
    );
    const AlternativePhoneNumber = new FormControl(this.currentUser.secondary_phone_number, Validators.required);

    this.form = new FormGroup(
      {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        name: name,
        company: companyNameDisabledField,
        role_in_company: companyRoleDisabledField,
        phone_country: phoneCountry,
        phone_number: phoneNumber,
        secondary_phone_country: SecondaryPhoneCountry,
        secondary_phone_number: AlternativePhoneNumber,
      },
      [PasswordConfirmationValidation]
    );
  }

  public submit() {
    if (this.form.valid) {
      if (this.form.value.password === '') {
        delete this.form.value.password;
        delete this.form.value.password_confirmation;
      }

      this.profileService.updateProfile({ profile: this.form.value }).subscribe(
        (response) => {
          UserSession.setCurrentUser(response['data']['attributes']);
          this.showUpdateMessageSuccessful();
        },
        (response) => {
          this.errorsMessages = response['error']['errors'];
        }
      );
    }
  }
}
