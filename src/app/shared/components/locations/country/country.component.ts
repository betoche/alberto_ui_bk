import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, ControlContainer, Validators, FormControl } from '@angular/forms';
import { FormGroupBase } from '../../form-group-base';
import * as _ from 'lodash';
import { COUNTRIES } from 'app/shared/master-data/countries.master-data';

@Component({
  selector: 'country-list',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    }
  ]
})
export class CountryComponent extends FormGroupBase implements OnInit{
  @Input('form') form: FormGroup;

  public countryList: any = [];

  constructor() {
    super();
  }

  ngOnInit() {
    _.each(COUNTRIES, (value, key) => {
      this.countryList.push({ value: key, label: value.name });
    })
  }
}
