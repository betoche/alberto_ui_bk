import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyModel } from 'app/shared/models/company/company.model';

export class FormHelper {

  public static companyFields(company: CompanyModel = new CompanyModel()) {
    let address_attributes = company['address_attributes'] || {};
    let billing_information_attributes = company['billing_information_attributes'] || {};

    let disableBillingInformations: boolean = company.type == 'Drugstore';

    return {
      name: new FormControl(company['name'], [Validators.required]),
      logo_url: new FormControl(company['logo_url'], [Validators.required]),
      company_code: new FormControl(
        { value: company['company_code'] || (new Date()).getTime(), disabled: true },
        [Validators.required]
      ),
      address_attributes: new FormGroup({
        id: new FormControl(address_attributes['id'], []),
        country_code: new FormControl(address_attributes['country_code'], [Validators.required]),
        province_code: new FormControl(address_attributes['province_code'], [Validators.required]),
        canton_code: new FormControl(address_attributes['canton_code'], [Validators.required]),
        district_code: new FormControl(address_attributes['district_code'], [Validators.required]),
        suburb_code: new FormControl(address_attributes['suburb_code'], [Validators.required]),
        note: new FormControl(address_attributes['note'], [Validators.required])
      }),
      billing_information_attributes: new FormGroup({
        id: new FormControl(
          { value: billing_information_attributes['id'], disabled: disableBillingInformations }, []
        ),
        company_name: new FormControl(
          { value: billing_information_attributes['company_name'], disabled: disableBillingInformations },
          [Validators.required]
        ),
        legal_note: new FormControl(
          { value: billing_information_attributes['legal_note'], disabled: disableBillingInformations },
        ),
        email: new FormControl(
          { value: billing_information_attributes['email'], disabled: disableBillingInformations },
          [Validators.required]
        ),
        government_id_type: new FormControl(
          { value: billing_information_attributes['government_id_type'], disabled: disableBillingInformations },
          [Validators.required]
        ),
        phone_number: new FormControl(
          { value: billing_information_attributes['phone_number'], disabled: disableBillingInformations },
          [Validators.required]
        ),
        phone_country: new FormControl(
          { value: billing_information_attributes['phone_country'], disabled: disableBillingInformations },
          [Validators.required]
        ),
        country_code: new FormControl(
          { value: billing_information_attributes['country_code'], disabled: disableBillingInformations },
          [Validators.required]
        ),
        province_code: new FormControl(
          { value: billing_information_attributes['province_code'], disabled: disableBillingInformations },
          [Validators.required]
        ),
        canton_code: new FormControl(
          { value: billing_information_attributes['canton_code'], disabled: disableBillingInformations },
          [Validators.required]
        ),
        district_code: new FormControl(
          { value: billing_information_attributes['district_code'], disabled: disableBillingInformations },
          [Validators.required]
        )
      })
    }
  }

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