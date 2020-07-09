import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormGroupBase } from '../../form-group-base';
import * as _ from 'lodash';
import { COUNTRIES } from 'app/shared/master-data/countries.master-data';

@Component({
  selector: 'canton-list',
  templateUrl: './canton.component.html',
  styleUrls: ['./canton.component.scss']
})
export class CantonComponent extends FormGroupBase implements OnInit {
  @Input('form') form: FormGroup;

  public cantonList: any = [];

  public countryControl: any;
  public provinceControl: any;

  constructor() {
    super();
  }

  ngOnInit() {
    this.countryControl = this.form.get('country_code');
    this.provinceControl = this.form.get('province_code');

    _.each(COUNTRIES, (country, countryCode) => {
      _.each(country['provinces'] || [], (province, provinceCode) => {
        _.each(province['cantons'] || [], (canton, cantonCode) => {
          this.cantonList.push({
            value: cantonCode,
            label: canton.name,
            country_code: countryCode,
            province_code: provinceCode
          });
        });
      });
    });

  }
}
