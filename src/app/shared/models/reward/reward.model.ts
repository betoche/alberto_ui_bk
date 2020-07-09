import { BaseModel } from '../base.model';

export class RewardModel extends BaseModel {
  public id: string;
  public code: string;
  public drugstore_id: string;
  public exchange_details: string;
  public expired_at: string;
  public loyalty_plan_name: string;
  public customer_name: string;
  public medication_name: string;
  public medication_description: string;
  public pharmaceutical_company_name: string;
  public redeemed_at: string;
  public reward_status: string;
  public amount: string;
  public amount_of_points_used: string;
  public amount_of_boxes_used: string

  constructor(params) {
    super();

    params = params || {};
    this.assignAttributesFromParams(params, [
      'id',
      'code',
      'drugstore_id',
      'exchange_details',
      'expired_at',
      'loyalty_plan_name',
      'customer_name',
      'medication_name',
      'medication_description',
      'pharmaceutical_company_name',
      'redeemed_at',
      'reward_status',
      'amount',
      'amount_of_points_used',
      'amount_of_boxes_used'
    ]);
  }
}
