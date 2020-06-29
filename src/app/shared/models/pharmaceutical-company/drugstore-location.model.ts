import { BaseModel } from '../base.model';

export class DrugstoreLocationModel extends BaseModel {
  public id: string;
  public full_address: string;
  public country_name: string;
  public province_name: string;
  public canton_name: string;
  public district_name: string;
  public suburb_name: string;
  public drugstore_name: string;

  constructor(params) {
    super();

    params = params || {};
    this.assignAttributesFromParams(params, [
      'id',
      'full_address',
      'country_name',
      'province_name',
      'canton_name',
      'district_name',
      'suburb_name',
      'drugstore_name',
      'drugstore_id',
    ]);
  }
}
