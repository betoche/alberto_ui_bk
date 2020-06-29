import { BaseModel } from '../base.model';

export class LoyaltyPlanModel extends BaseModel {
  public id: string;
  public name: string;
  public description: string;
  public logo_url: string;
  public website_url: string;
  public exchange_rule: string;
  public regulation_url: string;
  public terms_and_conditions_url: string;
  public logo_filename: string;
  public regulation_filename: string;
  public terms_and_conditions_filename: string;
  public rewards_expiration_date: string;

  constructor(params) {
    super();

    params = params || {};
    this.assignAttributesFromParams(params, [
      'id',
      'name',
      'description',
      'logo_url',
      'website_url',
      'exchange_rule',
      'regulation_url',
      'terms_and_conditions_url',
      'logo_filename',
      'regulation_filename',
      'terms_and_conditions_filename',
      'rewards_expiration_date',
    ]);
  }
}
