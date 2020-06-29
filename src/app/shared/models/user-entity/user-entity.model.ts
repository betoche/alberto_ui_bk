import { BaseModel } from '../base.model';

export class UserEntityModel extends BaseModel {
  public id: string;
  public name: string;
  public role: string;
  public entity_name: string;
  public status: string;
  public country_code: string;
  public country_name: string;
  public type: string;

  constructor(params) {
    super();

    params = params || {};
    this.assignAttributesFromParams(params, [
      'id',
      'name',
      'role',
      'entity_name',
      'status',
      'country_code',
      'country_name',
      'type',
      'created_at',
    ]);
  }
}
