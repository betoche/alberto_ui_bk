import { FormGroup, FormControl } from '@angular/forms';
import * as _ from 'lodash';

export class FormGroupBase {
  protected findControl(form: FormGroup, controlName: string){
    let itemFound: any;

    _.each(form.controls, (control, name) => {
      if(itemFound){
        return false;
      }

      if(name == controlName){
        itemFound = control;
        return itemFound;
      }

      if(control.constructor.name == 'FormGroup'){
        itemFound = this.findControl(control, controlName);
      }
    });

    return itemFound;
  }
}