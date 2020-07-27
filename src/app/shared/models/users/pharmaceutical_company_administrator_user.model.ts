import { UserModel } from './user.model';

export class PharmaceuticalCompanyAdministratorUserModel extends UserModel {

  public isBillingFunctionShown: boolean = true;
  public isCompanyShown: boolean = true;

  constructor(params) {
    super(params);
  }

}
