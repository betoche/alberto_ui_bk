import { COUNTRIES } from 'app/shared/master-data/countries.master-data'
import * as _ from 'lodash';

export class MasterDataCountry{
  public name: string;
  public provinces: any = [];

  public static all(){
    let data = [];
    _.each(COUNTRIES, (country, code) => {
      let provinces = [];
      _.each(country.provinces, (province, province_id) => {
        provinces.push( { id: province_id, name: province.name } );
      });

      data.push( {
        name: country.name, code: code,
        phone_code: country.phone_code, provinces: provinces
      } );
    });

    return data;
  }

  public static listCountriesForTreeview(checkedData = []){
    let data = [];
    let index = 1;

    _.each(COUNTRIES, (country, countryCode) => {
      let countryIndex = index;
      data.push({
        id: index, name: country.name,
        code: countryCode, hasChild: true
      });
      index += 1;

      _.each(country.provinces, (province, provinceCode) => {
        let provinceIndex = index;
        data.push({
          id: index, pid: countryIndex,
          name: province.name,
          code: provinceCode,
          hasChild: true
        });
        index += 1;

        _.each(province.cantons, (canton, cantonCode) => {
          let cantonIndex = index;
          data.push({
            id: index, pid: provinceIndex,
            name: canton.name,
            canton_code: cantonCode,
            hasChild: true
          });
          index += 1;

          _.each(canton.districts, (district, districtCode) => {
            let isChecked = _.find(
              checkedData, {
                country_code: countryCode,
                province_code: provinceCode,
                canton_code: cantonCode,
                district_code: districtCode
              }
            );

            data.push({
              id: index,
              pid: cantonIndex,
              name: district.name,
              district_code: districtCode,
              canton_code: cantonCode,
              province_code: provinceCode,
              country_code: countryCode,
              isChecked: !!isChecked,
              type: 'district'
            });
            index += 1;
          });
        });
      });
    });

    return data;
  }
}
