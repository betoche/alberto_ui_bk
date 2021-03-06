import { BaseModel } from '../base.model';

export class DrugstoreModel extends BaseModel {
  public id: string;
  public name: string;
  public active: boolean;

  constructor(params) {
    super();

    params = params || {};
    this.assignAttributesFromParams(params, ['id', 'name', 'active']);
  }
}
