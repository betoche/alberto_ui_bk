import { BaseModel } from '../base.model';

export class LoyaltyPlanMedicationModel extends BaseModel {
  public id: string;
  public medication_id: string;
  public medication_name: string;
  public medication_code: string;
  public loyalty_plan_id: string;
  public loyalty_plan_name: string;
  public status: string;
  public is_active: boolean;
  public medication_presentations: any=[];

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
      'medication_id',
      'medication_name',
      'medication_code',
      'loyalty_plan_id',
      'loyalty_plan_name',
      'status',
      'is_active',
      'medication_presentations'
    ]);
  }
}
