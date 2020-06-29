import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public signIn(email: string, password: string){
    return this.http.post(
      environment.apiURL + '/users/login',
      { user: { email: email, password: password } }
    );
  }

  public forgotPassword(email: string){
    return this.http.post(
      environment.apiURL + '/users/password_recoveries',
      { password_recovery: { email: email } }
    );
  }

  public resetPassword(password: string, token: string){
    return this.http.post(
      environment.apiURL + '/users/password_recoveries/reset',
      {
        password_recovery: {
          password: password, password_confirmation: password, reset_password_token: token
        }
      }
    );
  }

}
