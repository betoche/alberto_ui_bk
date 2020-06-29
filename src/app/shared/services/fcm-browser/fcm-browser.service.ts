import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { UserSession } from 'app/shared/services/user-session';
import { EventsService } from 'app/shared/services/events.service';

@Injectable()
export class FcmBrowserService {
  public token: string;
  public firebaseApp: any;
  public firebaseMessaging: any;

  constructor(private events: EventsService) {}

  public async getTokenAndSubscribeNotification() {
    if (this.token) return this.token;

    this.token = await this.getToken();

    if (this.token) {
      UserSession.setFcmToken(this.token);
      this.subscribeNotification();
    }
  }

  private async getToken() {
    if (!window['firebase']) return '';

    this.initializeFireBase();

    let workerFileName = `assets/js/firebase-worker.${environment['environment_name']}.js`;

    // add unique number version for the file to fix issue caused by caching
    let worker = navigator.serviceWorker.register(workerFileName + '?v=' + new Date().getTime());

    await worker.then(registration => {
      this.firebaseMessaging.useServiceWorker(registration);
    });

    return await this.firebaseMessaging.getToken().then(token => token);
  }

  private subscribeNotification() {
    this.firebaseMessaging.onMessage(payload => {
      this.events.publish('fcm-notification-message', payload);
    });
  }

  private initializeFireBase() {
    this.firebaseApp = this.firebaseApp || window['firebase'].initializeApp(environment['firebaseConfig']);
    this.firebaseMessaging = this.firebaseMessaging || this.firebaseApp.messaging();
  }
}
