import * as _ from 'lodash';

export class BaseModel {
  constructor(params?) {}

  public assignAttributesFromParams(params = {}, onlyKeys = []) {
    onlyKeys.forEach(key => {
      if (params[key] !== undefined) {
        this[key] = params[key];
      }
    });
  }

  public static buildFrom(items: any) {
    let array = [];
    items.forEach(item => {
      array.push(new this(item));
    });

    return array;
  }

  public static buildFromResponse(response: any) {
    let items = _.map(response['data'], 'attributes');
    let array = [];
    items.forEach(item => {
      array.push(new this(item));
    });

    return array;
  }
}
