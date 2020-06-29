import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'secure-password-input',
  templateUrl: './secure-password-input.component.html',
  styleUrls: ['./secure-password-input.component.scss']
})
export class SecurePasswordInputComponent implements OnInit {
  @Input('name') name: any;
  @Input('placeholder') placeholder: string = '';
  @Input('objectField') objectField: any = {};

  public hide = true;
  public parentForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.parentForm = this.objectField.parent;
    this.parentForm.controls[this.name].setValidators([
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W\_])[A-Za-z\d\W\_]{8,}$/)
    ]);
  }

  public numberCheck() {
    return /[0-9]+/g.test(this.objectField.value);
  }

  public specialCharactersCheck() {
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(this.objectField.value);
  }

  public upperCaseCharactersCheck() {
    return /[A-Z]+/g.test(this.objectField.value);
  }

  public minimumCheck() {
    return /(?=.{8,})/.test(this.objectField.value);
  }
}
