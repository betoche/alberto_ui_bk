import { BaseModel } from '../base.model';

export class MedicationCategoryModel extends BaseModel {
  public id: string;
  public name: string;

  constructor(params) {
    super();

    params = params || {};
    this.assignAttributesFromParams(params, ['id', 'name']);
  }
}
