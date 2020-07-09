import { BaseModel } from './base.model';
import { CompanyModel } from 'app/shared/models/company/company.model';

export class UserModel extends BaseModel {
  public id: string;
  public name: string;
  public last_name: string;
  public email: string;
  public role: string;
  public status: string;
  public government_id: number;
  public phone_number: number;
  public phone_country: string;
  public secondary_phone_number: string;
  public secondary_phone_country: string;

  // additional attributes
  public company: any;

  constructor(params) {
    super();

    params = params || {};
    this.assignAttributesFromParams(params, [
      'id', 'email', 'role', 'name', 'last_name',
      'government_id', 'current_sign_in_at', 'status',
      'phone_number', 'phone_country', 'secondary_phone_number',
      'secondary_phone_country'
    ]);

    if(params['company']){
      this.setCompany(params['company']);
    }
  }

  public setCompany(data){
    this.company = new CompanyModel(data);
  }

  public roleName(){
    return {
      administrator: 'Administrator',
      benefits_provider_commerce_administrator: 'Administrator',
      pharmaceutical_company_administrator: 'Administrator',
      drugstore_administrator: 'Administrator'
    }[this.role];
  }
}
