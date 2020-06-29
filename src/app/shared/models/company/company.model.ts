import { BaseModel } from '../base.model';

export class CompanyModel extends BaseModel {
  public id: string;
  public type: string;
  public name: string;
  public company_code: string;
  public status: string;
  public address_attributes: any = {};
  public billing_information_attributes: any = {};
  public administrator_user: any = {};

  constructor(params) {
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
      'administrator_user'
    ]);
  }
}
