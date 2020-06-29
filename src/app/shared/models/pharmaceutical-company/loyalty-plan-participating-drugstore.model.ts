import { BaseModel } from '../base.model';

export class LoyaltyPlanParticipatingDrugstoreModel extends BaseModel {
  public id: string;
  public drugstore_name: string;
  public full_address: string;
  public drugstore_location_id: string;
  public status: string;

  constructor(params) {
    super();

    params = params || {};
    this.assignAttributesFromParams(params, [
      'id',
      'drugstore_name',
      'full_address',
      'drugstore_location_id',
      'status',
    ]);
  }
}
