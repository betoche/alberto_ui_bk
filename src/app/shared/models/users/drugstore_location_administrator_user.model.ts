import { UserModel } from './user.model';

export class DrugstoreLocationAdministratorUserModel extends UserModel {

  public isBillingFunctionShown: boolean = false;
  public isCompanyShown: boolean = true;

  constructor(params) {
    super(params);
  }

}
