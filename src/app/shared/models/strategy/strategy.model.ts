import { BaseModel } from '../base.model';

export class StrategyModel extends BaseModel {
  public id: string;
  public client_status: string;
  public code: string;
  public age_min_limit: number;
  public age_max_limit: number;
  public all_ages_selected: boolean;
  public gender_of_target_market: number;
  public expiration_option: string;
  public initial_date: string;
  public end_date: string;
  public name: string;
  public description: string;
  public strategy_type_id: string;
  public strategy_profile_id: string;
  public benefits_provider_commerce_id: string;
  public can_be_exchanged: string;
  public amount_of_times_can_be_exchanged: number;
  public strategy_type_name: string;
  public logo_url: string;
  public terms_and_conditions_url: string;
  public addresses_attributes: any = [];

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
      'client_status',
      'code',
      'age_min_limit',
      'age_max_limit',
      'all_ages_selected',
      'gender_of_target_market',
      'expiration_option',
      'initial_date',
      'end_date',
      'name',
      'description',
      'strategy_type_id',
      'strategy_profile_id',
      'benefits_provider_commerce_id',
      'can_be_exchanged',
      'amount_of_times_can_be_exchanged',
      'strategy_type_name',
      'logo_url',
      'terms_and_conditions_url',
      'addresses_attributes'
    ]);
  }
}
