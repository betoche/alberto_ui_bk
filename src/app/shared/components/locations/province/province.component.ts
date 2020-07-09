import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, ControlContainer, FormControl, Validators } from '@angular/forms';
import { FormGroupBase } from '../../form-group-base';
import * as _ from 'lodash';
import { COUNTRIES } from 'app/shared/master-data/countries.master-data';

@Component({
  selector: 'province-list',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    }
  ]
})
export class ProvinceComponent extends FormGroupBase implements OnInit {
  @Input('form') form: FormGroup;

  public provinceList: any = [];
  public countryControl: any;

  constructor() {
    super();
  }

  ngOnInit() {
    this.countryControl = this.form.get('country_code');

    _.each(COUNTRIES, (country, countryCode) => {
      _.each(country['provinces'] || [], (province, provinceCode) => {
        this.provinceList.push({
          value: provinceCode, label: province.name, country_code: countryCode
        });
      })
    })
  }
}
