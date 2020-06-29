import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, ControlContainer, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'address-fields',
  templateUrl: './address-fields.component.html',
  styleUrls: ['./address-fields.component.scss']
})
export class AddressFieldsComponent implements OnInit{
  @Input('form') form: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }
}
