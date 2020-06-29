import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, ControlContainer, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'billing-information-fields',
  templateUrl: './billing-information-fields.component.html'
})
export class BillingInformationFieldsComponent implements OnInit {
  @Input('form') form: FormGroup;
  @Input('position') position: any = 3;

  constructor() {}

  ngOnInit() {
    this.position = parseInt(this.position);
  }
}
