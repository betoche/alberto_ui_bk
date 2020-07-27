import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyModel } from 'app/shared/models/company/company.model';

export class FormHelper {

  public static drugstoreLocationFields(company: any = {}) {
    let address_attributes = company['address_attributes'] || {};

    return {
      company_name: new FormControl(
        { value: company['company_name'], disabled: true }, [Validators.required]
      ),
      company_code: new FormControl(
        { value: company['company_code'], disabled: true }, [Validators.required]
      ),
      name: new FormControl(
        { value: company['name'] }, [Validators.required]
      ),
      code: new FormControl(
        { value: company['code'], disabled: true }, [Validators.required]
      ),
      address_attributes: new FormGroup({
        id: new FormControl(address_attributes['id'], []),
        country_code: new FormControl(address_attributes['country_code'], [Validators.required]),
        province_code: new FormControl(address_attributes['province_code'], [Validators.required]),
        canton_code: new FormControl(address_attributes['canton_code'], [Validators.required]),
        district_code: new FormControl(address_attributes['district_code'], [Validators.required]),
        suburb_code: new FormControl(address_attributes['suburb_code'], [Validators.required]),
        note: new FormControl(address_attributes['note'], [Validators.required])
      })
    }
  }

}