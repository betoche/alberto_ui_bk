import { BaseModel } from '../base.model';

export class StrategyProfileModel extends BaseModel {
    public id: string;
    public name: string;
    public strategy_attributes: any;

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
            'strategy_attributes'
        ]);
    }
}
