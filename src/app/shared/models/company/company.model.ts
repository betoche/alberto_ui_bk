import { BaseModel } from '../base.model';
import { UserModel } from '../user.model';
import { COUNTRIES } from 'app/shared/master-data/countries.master-data';

export class CompanyModel extends BaseModel {
  public id: string;
  public type: string;
  public name: string;
  public company_code: string;
  public status: string;
  public address_attributes: any = {};
  public billing_information_attributes: any = {};
  public administrator_user: any = {};
  public logo_url: string;

  // additional attributes
  public country_name: string = '';
  public country_code: string = '';

  constructor(params = {}) {
    super();

    params = params || {};
    this.assignAttributesFromParams(params, [
      'id',
      'type',
      'name',
      'company_code',
      'status',
      'address_attributes',
      'billing_information_attributes',
      'logo_url'
    ]);

    this.setCountryName();
    this.setAdministratorUser(params['administrator_user']);
  }

  public setAdministratorUser(user){
    this.administrator_user = new UserModel(user);
  }

  public setCountryName(){
    if(!this.address_attributes){
      return '';
    }

    this.country_code = this.address_attributes['country_code'];
    this.country_name = COUNTRIES[this.address_attributes['country_code']  ] &&
                        COUNTRIES[this.address_attributes['country_code']]['name'];
  }
}
