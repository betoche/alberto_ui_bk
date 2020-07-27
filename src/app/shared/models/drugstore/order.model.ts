import { BaseModel } from '../base.model';

export class OrderModel extends BaseModel {
  public id: string;
  public number_of_requests: number;
  public requested_date_time: any;
  public requested_date_time_formatted: any;
  public order_status_code: string;
  public quantity: number;
  public order_items: any;
  public customer_full_name: string;
  public place_of_delivery: string;
  public customer_main_phone_number: string;
  public subtotal: number;
  public tax: number;
  public total: number;
  public tax_formatted: string;
  public subtotal_formatted: string;
  public total_formatted: string;
  public price_formatted: string;
  public medication_names: string;

  constructor(params) {
    super();

    params = params || {};
    this.assignAttributesFromParams(params, [
      'id',
      'number_of_requests',
      'requested_date_time',
      'quantity',
      'medication_names',
      'requested_date_time_formatted',
      'order_status_code',
      'order_items',
      'aasm_state',
      'customer_full_name',
      'place_of_delivery',
      'customer_main_phone_number',
      'subtotal',
      'tax',
      'total',
      'tax_formatted',
      'subtotal_formatted',
      'total_formatted',
      'price_formatted',
    ]);
  }
}
