import { BaseModel } from '../base.model';

export class BenefitsProviderModel extends BaseModel {
  public id: string;
  public name: string;

  constructor(params: any) {
    super();

    params = params || {};
    this.assignAttributesFromParams(params, ['id', 'name']);
  }
}
