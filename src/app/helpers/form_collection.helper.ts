import { injectorsGlobal } from 'app/shared/services/injectors_global.service';
import * as _ from 'lodash';

export let FormCollectionHelper = {

  getGovernmentIdTypes: () => {
    return [
      {
        "value": "identification_card",
        "label": injectorsGlobal.translate.instant('GOVERNMENT_IDENTIFICATION_CARD')
      },
      {
        "value": "civil_registration",
        "label": injectorsGlobal.translate.instant('GOVERNMENT_CIVIL_REGISTRATION')
      },
      {
        "value": "immigration",
        "label": injectorsGlobal.translate.instant('GOVERNMENT_IMMIGRATION')
      },
      {
        "value": "ruc_nic",
        "label": injectorsGlobal.translate.instant('GOVERNMENT_RUC_NIC')
      },
      {
        "value": "passport",
        "label": injectorsGlobal.translate.instant('GOVERNMENT_PASSPORT')
      },
      {
        "value": "card",
        "label": injectorsGlobal.translate.instant('GOVERNMENT_CARD')
      }
    ]
  },

  getProvinces: () => {
    return _.map([], province => {
      return { label: province.name, value: province.id };
    });
  },

  getCounties: (provinceId) => {
    if(provinceId){
      let items = _.filter([], ['province_id', provinceId]);

      return _.map(items, county => {
        return { label: county.name, value: county.canton_id };
      })
    }else{
      return [];
    }
  },

  getDistricts: (provinceId, countyId) => {
    if(provinceId && countyId){
      let items = _.filter(
        [], {'province_id': provinceId, 'canton_id': countyId}
      );

      return _.map(items, district => {
        return { label: district.name, value: district.district_id };
      })
    }else{
      return [];
    }
  }

}
