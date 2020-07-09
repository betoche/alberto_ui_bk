import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, ControlContainer, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { COUNTRIES } from 'app/shared/master-data/countries.master-data';
import { parsePhoneNumberFromString } from 'libphonenumber-js'

@Component({
  selector: 'phone-number-with-country-flag',
  templateUrl: './phone-number-with-country-flag.component.html',
  styleUrls: ['./phone-number-with-country-flag.component.scss']
})
export class PhoneNumberWithCountryFlagComponent implements OnInit{
  @Input('form') form: FormGroup;
  @Input('country') country: FormControl;
  @Input('number') number: FormControl;

  public countryFlags: any = []
  public numberMask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  public isValidPhoneNumber: boolean = true;

  constructor() {}

  ngOnInit() {
    this.countryFlags = Object.keys(COUNTRIES);
  }

  public checkPhoneNumberIsValid(){
    if(!this.number.value || !this.country.value){
      this.isValidPhoneNumber = true;
      return false;
    }

    let phoneNumber = parsePhoneNumberFromString(this.number.value, this.country.value);
    this.isValidPhoneNumber = phoneNumber && phoneNumber.isValid();

    if(this.isValidPhoneNumber){
      this.number.setErrors(null);
    }else{
      this.number.setErrors({ invalidPhoneNumber: true });
    }
  }
}
