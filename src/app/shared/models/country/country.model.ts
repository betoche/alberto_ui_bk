import { BaseModel } from '../base.model';

export class CountryModel extends BaseModel {
  public code: string;
  public name: string;

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
      'code',
      'name'
    ]);
  }
}
