import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormGroupBase } from '../../form-group-base';
import * as _ from 'lodash';
import { COUNTRIES } from 'app/shared/master-data/countries.master-data';

@Component({
  selector: 'district-list',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent extends FormGroupBase implements OnInit {
  @Input('form') form: FormGroup;

  public districtList: any = [];

  public countryControl: any;
  public provinceControl: any;
  public cantonControl: any;

  constructor() {
    super();
  }

  ngOnInit() {
    this.countryControl = this.form.get('country_code');
    this.provinceControl = this.form.get('province_code');
    this.cantonControl = this.form.get('canton_code');

    _.each(COUNTRIES, (country, countryCode) => {
      _.each(country['provinces'] || [], (province, provinceCode) => {
        _.each(province['cantons'] || [], (canton, cantonCode) => {
          _.each(canton['districts'] || [], (district, districtCode) => {
            this.districtList.push({
              value: districtCode,
              label: district.name,
              country_code: countryCode,
              province_code: provinceCode,
              canton_code: cantonCode,
              district_code: districtCode
            });
          });
        });
      });
    });

  }
}
