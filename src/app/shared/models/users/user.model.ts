import { BaseModel } from '../base.model';
import { CompanyModel } from '../company/company.model';
import { injectorsGlobal } from 'app/shared/services/injectors_global.service';
import { COUNTRIES } from 'app/shared/master-data/countries.master-data'

export class UserModel extends BaseModel {
  public id: string;
  public email: string;
  public name: string;
  public authentication_token: string;
  public completed_profile: boolean;
  public confirmed_at: string;
  public current_sign_in_at: string;
  public government_id: string;
  public phone_country: string;
  public phone_number: string;
  public secondary_phone_country: string;
  public secondary_phone_number: string;
  public role: string;
  public status: string;
  public type: string;

  public company: CompanyModel;

  constructor(params = {}) {
    super();

    params = params || {};
    this.assignAttributesFromParams(params, [
      'id',
      'email',
      'name',
      'authentication_token',
      'completed_profile',
      'confirmed_at',
      'current_sign_in_at',
      'government_id',
      'phone_country',
      'phone_number',
      'secondary_phone_country',
      'secondary_phone_number',
      'role',
      'status',
      'type'
    ]);

    if(!params['without_company_relation']){
      this.setCompany(params['company']);
    }
  }

   public typeOfCompany(){
    if(this.company && this.company['type']){ return this.company['type'] };

    return {
      'pharmaceutical_company_administrator': 'PharmaceuticalCompany',
      'drugstore_administrator': 'Drugstore',
      'drugstore_location_administrator': 'DrugstoreLocation',
      'administrator': '',
      'benefits_provider_commerce_administrator': 'BenefitsProviderCommerce'
    }[this.role];
  }

  public administratorRoleFromTypeOfCompany(type){
    return {
      'PharmaceuticalCompany': 'pharmaceutical_company_administrator',
      'Drugstore': 'drugstore_administrator',
      'BenefitsProviderCommerce': 'benefits_provider_commerce_administrator'
    }[type];
  }


  public setCompany(company){
    this.company = new CompanyModel(
      Object.assign(company || {}, { without_user_relation: true })
    );
  }

  public roleName(){
    return injectorsGlobal.translate.instant('ROLES')[this.role];
  }

  public phoneCountryCode(){
    if(!this.phone_country || COUNTRIES[this.phone_country] == null){
      return '';
    }

    return COUNTRIES[this.phone_country]['phone_code'];
  }

  public secondaryPhoneCode(){
    if(!this.secondary_phone_country || COUNTRIES[this.secondary_phone_country] == null){
      return '';
    }

    return COUNTRIES[this.secondary_phone_country]['phone_code'];
  }

  public isBillingShownToUI(){
    if(!this['isBillingFunctionShown']){
      return false;
    }

    return !!this.company && !!this.company.has_billing_information;
  }
}
