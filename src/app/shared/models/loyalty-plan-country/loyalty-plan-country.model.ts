
import { BaseModel } from '../base.model';

export class LoyaltyPlanCountryModel extends BaseModel {
  public id: string;
  public loyalty_plan_id: string;
  public loyalty_plan_name: string;
  public status: string;
  public country_code: string;
  public country_name: string;
  public is_active: boolean;

  constructor(params) {
    super();

    let attributes: any = {};
    params = params || {};

    // determine custom params or response params from API
    if (params['data'] && params['data']['attributes']) {
      attributes = params['data']['attributes'];
    } else {
      attributes = params;
    }

    // assign attributes for current object
    this.assignAttributesFromParams(attributes, [
      'id',
      'loyalty_plan_name',
      'loyalty_plan_id',
      'status',
      'country_code',
      'is_active',
      'country_name',
    ]);
  }
}
