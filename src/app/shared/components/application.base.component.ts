import { UserSession } from 'app/shared/services/user-session';
import { injectorsGlobal } from 'app/shared/services/injectors_global.service';

export class ApplicationBaseComponent {
  public currentUser: any;
  public errorsMessages: string;

  constructor() {
    this.errorsMessages = '';
    this.currentUser = UserSession.getCurrentUser();
  }

  public showUpdateMessageSuccessful() {
    injectorsGlobal.snack.open(injectorsGlobal.translate.instant('DATA_UPDATED'), 'OK', { duration: 5000 });
  }

  public showCreationMessageSuccessful() {
    injectorsGlobal.snack.open(injectorsGlobal.translate.instant('DATA_ADDED'), 'OK', { duration: 5000 });
  }
}
