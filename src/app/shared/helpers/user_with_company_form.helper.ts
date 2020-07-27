import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyModel } from 'app/shared/models/company/company.model';

export class UserWithCompanyFormHepler {

  public static companyFields(company: CompanyModel = new CompanyModel(), options: any = {}) {
    let address_attributes = company['address_attributes'] || {};
    let billing_information_attributes = company['billing_information_attributes'] || {};

    let disableBillingInformation = !options['isBillingShownToUI'] || !company.has_billing_information;

    return {
      name: new FormControl(
        { value: company['name'], disabled: options['disabledName'] }, [Validators.required]),
      logo_url: new FormControl(company['logo_url'], [Validators.required]),
      company_code: new FormControl(
        { value: company['company_code'] || (new Date()).getTime(), disabled: true },
        [Validators.required]
      ),
      has_billing_information: new FormControl(company.has_billing_information, []),
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
        same_address_fields: new FormControl(false),
        id: new FormControl(
          {
            value: billing_information_attributes['id'],
            disabled: disableBillingInformation
          },
          []
        ),
        company_name: new FormControl(
          {
            value: billing_information_attributes['company_name'],
            disabled: disableBillingInformation
          },
          [Validators.required]
        ),
        legal_note: new FormControl(
          {
            value: billing_information_attributes['legal_note'],
            disabled: disableBillingInformation
          }
        ),
        email: new FormControl(
          {
            value: billing_information_attributes['email'],
            disabled: disableBillingInformation
          },
          [Validators.required]
        ),
        government_id_type: new FormControl(
          {
            value: billing_information_attributes['government_id_type'],
            disabled: disableBillingInformation
          },
          [Validators.required]
        ),
        phone_number: new FormControl(
          {
            value: billing_information_attributes['phone_number'],
            disabled: disableBillingInformation
          },
          [Validators.required]
        ),
        phone_country: new FormControl(
          {
            value: billing_information_attributes['phone_country'],
            disabled: disableBillingInformation
          },
          [Validators.required]
        ),
        country_code: new FormControl(
          {
            value: billing_information_attributes['country_code'],
            disabled: disableBillingInformation
          },
          [Validators.required]
        ),
        province_code: new FormControl(
          {
            value: billing_information_attributes['province_code'],
            disabled: disableBillingInformation
          },
          [Validators.required]
        ),
        canton_code: new FormControl(
          {
            value: billing_information_attributes['canton_code'],
            disabled: disableBillingInformation
          },
          [Validators.required]
        ),
        district_code: new FormControl(
          {
            value: billing_information_attributes['district_code'],
            disabled: disableBillingInformation
          },
          [Validators.required]
        ),
        suburb_code: new FormControl(
          {
            value: billing_information_attributes['suburb_code'],
            disabled: disableBillingInformation
          },
          [Validators.required]
        ),
        note: new FormControl(
          {
            value: billing_information_attributes['note'],
            disabled: disableBillingInformation
          },
          [Validators.required]
        )
      })
    }
  }

  public static getFormValueForUserAndCompanyForm(form){
    let params = form.value;
    let commpanyControl = form.get('company');

    // company has billing information
    if(Object.keys(commpanyControl.controls).length > 0 &&
       commpanyControl.get('has_billing_information').value){

      // use same address for billing
      if(params['company']['billing_information_attributes']['same_address_fields']){
        [
          'country_code', 'province_code', 'canton_code',
          'district_code', 'suburb_code', 'note'
        ].forEach( key => {
          // copy value from address to billing
          params['company']['billing_information_attributes'][key] =
                                              params['company']['address_attributes'][key];
        });
      }
    }

    return params;
  }


}