import {
  PharmaceuticalCompanyAdministratorUserModel
} from './pharmaceutical_company_administrator_user.model';

import {
  DrugstoreAdministratorUserModel
} from './drugstore_administrator_user.model';

import {
  DrugstoreLocationAdministratorUserModel
} from './drugstore_location_administrator_user.model';

import {
  AdministratorUserModel
} from './administrator_user.model';

import {
  BenefitsProviderCommerceUserModel
} from './benefits_provider_commerce_administrator_user.model';

export class UserEntityModel {

  constructor() {}

  public static getUserInstance(params){
    const rolesMapping: any = {
      'pharmaceutical_company_administrator': PharmaceuticalCompanyAdministratorUserModel,
      'drugstore_administrator': DrugstoreAdministratorUserModel,
      'drugstore_location_administrator': DrugstoreLocationAdministratorUserModel,
      'administrator': AdministratorUserModel,
      'benefits_provider_commerce_administrator': BenefitsProviderCommerceUserModel
    };

    const userClass = rolesMapping[params['role']] || this;
    return new userClass(params);
  }
}
