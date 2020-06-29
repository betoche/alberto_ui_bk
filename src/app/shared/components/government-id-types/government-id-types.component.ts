import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, ControlContainer, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'government-id-types',
  templateUrl: './government-id-types.component.html',
  styleUrls: ['./government-id-types.component.scss']
})
export class GovernmentIdTypesComponent implements OnInit{
  @Input('form') form: FormGroup;
  @Input('disabled') disabled: boolean;

  public governmentIdTypes: any = [
    "GOVERNMENT_IDENTIFICATION_CARD",
    "GOVERNMENT_IDENTIFICATION",
    "GOVERNMENT_CIVIL_REGISTRATION",
    "GOVERNMENT_IMMIGRATION",
    "GOVERNMENT_RUC_NIC",
    "GOVERNMENT_PASSPORT",
    "GOVERNMENT_CARD"
  ];

  constructor() {}

  ngOnInit() {}
}
