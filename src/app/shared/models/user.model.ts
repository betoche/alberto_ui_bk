import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
  public id: string;
  public name: string;
  public last_name: string;
  public email: string;
  public role: string;
  public government_id: string;

  constructor(params) {
    super();

    params = params || {};
    this.assignAttributesFromParams(params, [
      'id', 'email', 'role', 'name', 'last_name',
      'government_id', 'current_sign_in_at'
    ]);
  }
}
