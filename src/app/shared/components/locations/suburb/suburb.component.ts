import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormGroupBase } from '../../form-group-base';
import * as _ from 'lodash';
import { COUNTRIES } from 'app/shared/master-data/countries.master-data';

@Component({
  selector: 'suburb-list',
  templateUrl: './suburb.component.html',
  styleUrls: ['./suburb.component.scss']
})
export class SuburbComponent extends FormGroupBase implements OnInit {
  @Input('form') form: FormGroup;

  public suburbList: any = [];

  public countryControl: any;
  public provinceControl: any;
  public cantonControl: any;
  public districtControl: any;

  constructor() {
    super();
  }

  ngOnInit() {
    this.countryControl = this.form.get('country_code');
    this.provinceControl = this.form.get('province_code');
    this.cantonControl = this.form.get('canton_code');
    this.districtControl = this.form.get('district_code');

    _.each(COUNTRIES, (country, countryCode) => {
      _.each(country['provinces'] || [], (province, provinceCode) => {
        _.each(province['cantons'] || [], (canton, cantonCode) => {
          _.each(canton['districts'] || [], (district, districtCode) => {
            _.each(district['suburbs'] || [], (suburb, suburbCode) => {
              this.suburbList.push({
                value: suburbCode,
                label: suburb.name,
                country_code: countryCode,
                province_code: provinceCode,
                canton_code: provinceCode,
                district_code: districtCode,
                suburb_code: suburbCode
              });
            });
          });
        });
      });
    });

  }
}
