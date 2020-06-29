import { FormGroup } from '@angular/forms';

export function PasswordConfirmationValidation(formGroup: FormGroup){
  if(formGroup.get('password').value != formGroup.get('password_confirmation').value) {
    formGroup.get('password_confirmation').setErrors( { MatchPassword: true } );
  } else {
    return null;
  }
}
