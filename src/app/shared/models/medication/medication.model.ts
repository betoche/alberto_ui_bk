import { BaseModel } from '../base.model';

export class MedicationModel extends BaseModel {
  public id: string;
  public name: string;
  public pharmaceutical_company_id: string;
  public medication_category_id: string;
  public code: string;
  public logo_url: string;
  public description: string;
  public adults_dosification_amount: number;
  public adults_dosification_frequency_measure: number;
  public adults_dosification_frequency: string;
  public children_dosification_amount: number;
  public children_dosification_frequency_measure: number;
  public children_dosification_frequency: string;
  public pharmaceutical_company_name: string;
  public medication_category_name: string;
  public medication_presentations_attributes: any=[];
  public medication_prices_attributes: any=[];

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
      'name',
      'pharmaceutical_company_id',
      'medication_category_id',
      'code',
      'logo_url',
      'description',
      'adults_dosification_amount',
      'adults_dosification_frequency_measure',
      'adults_dosification_frequency',
      'children_dosification_amount',
      'children_dosification_frequency_measure',
      'children_dosification_frequency',
      'pharmaceutical_company_name',
      'medication_category_name',
      'medication_presentations_attributes',
      'medication_prices_attributes'
    ]);
  }
}
