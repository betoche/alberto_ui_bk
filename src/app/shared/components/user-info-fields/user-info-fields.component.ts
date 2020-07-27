import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, ControlContainer, FormBuilder, Validators } from '@angular/forms';
import { FormCollectionHelper } from 'app/helpers/form_collection.helper';

@Component({
  selector: 'app-user-info-fields',
  templateUrl: './user-info-fields.component.html',
  styleUrls: ['./user-info-fields.component.scss']
})
export class UserInfoFieldsComponent implements OnInit {
  @Input('form') form: FormGroup;
  @Input('showRoleField') showRoleField: boolean = false;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
  }

  public showBillingInformation(event){
    let billingControls = this.form.get('company').get('billing_information_attributes')['controls'];

    Object.keys(billingControls).forEach(key => {
      let control = billingControls[key];
      if(event.checked){
        control.enable();
      }else{
        control.disable();
      }
    });
  }

}
