import { BaseModel } from '../base.model';

export class MedicationsIncludedByCountryModel extends BaseModel {
  public id: string;
  public status: string;
  public medication_name: string;
  public medication_code: string;
  public is_active: boolean;
  public amount_of_boxes_required: number;
  public reward: number;
  public exchange_limit_by_year: number;
  public medication_points: number;
  public amount_of_points_required: number;
  public loyalty_plan_id: number;
  public loyalty_plan_medication_id: number;
  public medication_presentation_content: string;
  public medication_presentation_id: string;
  public isChanged: number;
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
      'status',
      'medication_name',
      'medication_code',
      'is_active',
      'amount_of_boxes_required',
      'reward',
      'exchange_limit_by_year',
      'medication_points',
      'amount_of_points_required',
      'loyalty_plan_id',
      'loyalty_plan_medication_id',
      'isChanged',
      'medication_presentations',
      'medication_presentation_content',
      'medication_presentation_id',
    ]);
  }
}
