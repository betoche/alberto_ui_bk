import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  public signIn(email: string, password: string, options = {}) {
    return this.http.post(
      environment.apiURL + '/users/login',
      Object.assign({ user: { email: email, password: password } }, options)
    );
  }

  public forgotPassword(email: string) {
    return this.http.post(environment.apiURL + '/users/password_recoveries', {
      password_recovery: { email: email }
    });
  }

  public resetPassword(password: string, token: string) {
    return this.http.post(environment.apiURL + '/users/password_recoveries/reset', {
      password_recovery: {
        password: password,
        password_confirmation: password,
        reset_password_token: token
      }
    });
  }

  public confirmationUser(password: string, token: string) {
    return this.http.put(environment.apiURL + '/users/confirmations', {
      user: {
        password: password,
        password_confirmation: password,
        confirmation_token: token
      }
    });
  }

  public validPasswordToken(token: string) {
    return this.http.get(environment.apiURL + '/users/confirmations/' + token);
  }

  public update(id, params) {
    return this.http.put(environment.apiURL + '/users/' + id, params);
  }
}
