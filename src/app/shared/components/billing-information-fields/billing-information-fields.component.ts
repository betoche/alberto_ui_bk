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

  public setLocationsFromAddress(event){
    this.form.get('billing_information_attributes').get('same_address_fields').setValue(event.checked);

    let address = this.form.get('address_attributes');

    [
      'country_code', 'province_code', 'canton_code',
      'district_code', 'suburb_code', 'note'
    ].forEach( key => {
      let field = this.form.get('billing_information_attributes').get(key);
      if(event.checked){
        field.setValue(address.get(key).value);
        field.disable();
      }else{
        field.enable();
      }
    });
  }
}
