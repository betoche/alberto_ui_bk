import { UserModel } from './user.model';

export class AdministratorUserModel extends UserModel {

  public isBillingFunctionShown: boolean = false;
  public isCompanyShown: boolean = false;

  constructor(params) {
    super(params);
  }

}
