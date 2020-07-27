import { UserModel } from './user.model';

export class DrugstoreAdministratorUserModel extends UserModel {

  public isBillingFunctionShown: boolean = false;
  public isCompanyShown: boolean = true;

  constructor(params) {
    super(params);
  }

}
