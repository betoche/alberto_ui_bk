import { UserSession } from 'app/shared/services/user-session';
import { injectorsGlobal } from 'app/shared/services/injectors_global.service';


export class ApplicationBaseComponent {
  public currentUser: any;
  public errorsMessages: string;
  public messageOptions: any = {};

  constructor() {
    this.errorsMessages = '';
    this.currentUser = UserSession.getCurrentUser();
  }

  public showUpdateMessageSuccessful() {
    injectorsGlobal.snack.open(injectorsGlobal.translate.instant('DATA_UPDATED'), 'OK', { duration: 5000 });
  }

  public showCreationMessageSuccessful(message: string = '') {
    message = message || injectorsGlobal.translate.instant('DATA_ADDED');
    injectorsGlobal.snack.open(message, 'OK', { duration: 5000 });
  }

  public checkMessageFromUrlQuery(){
    if(injectorsGlobal.route.snapshot.queryParams.message){
      this.showFlashSuccessful(injectorsGlobal.route.snapshot.queryParams.message);
    }

    if(injectorsGlobal.route.snapshot.queryParams.error){
      this.showFlashFailed(injectorsGlobal.route.snapshot.queryParams.error);
    }
  }

  public showFlashSuccessful(message){
    this.messageOptions = {
      type: 'success',
      message: message
    }
  }

  public showFlashFailed(message){
    this.messageOptions = {
      type: 'danger',
      message: message
    }
  }
}
