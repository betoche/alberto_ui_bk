import { Validators } from '@angular/forms';

export let FormControlsHelper = {
  phoneNumber: function(value: any = '') {
    return [value, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]];
  },

  requireFieldOnly: function(value: any = '') {
    return [value, Validators.required];
  },

  requireAndDisableField: function(value: any = '') {
    return [{ value: value, disabled: true }, Validators.required];
  },

  booleanField: function(value: any = false) {
    return [value];
  },

  emailField: function(value: any = '') {
    return [
      value,
      [
        Validators.required,
        Validators.email,
        Validators.pattern(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        )
      ]
    ];
  },

  disableField: function(value: any = '') {
    return [{ value: value, disabled: true }];
  },

  passwordField: function(required: boolean = true) {
    if (required) {
      return ['', Validators.required];
    } else {
      return [''];
    }
  }
};
