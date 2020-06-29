export class UserSession {
  public static currentUser: any;

  public static setCurrentUser(user: any) {
    UserSession.currentUser = user;
    localStorage.setItem('current_user', JSON.stringify(user));
  }

  public static getCurrentUser() {
    if (UserSession.currentUser) {
      return UserSession.currentUser;
    } else {
      let user = JSON.parse(localStorage.getItem('current_user') || null);
      UserSession.currentUser = user;
      return user;
    }
  }

  public static removeCurrentUser() {
    UserSession.currentUser = null;
    localStorage.removeItem('current_user');
  }

  public static isSignedIn() {
    let user = UserSession.getCurrentUser();
    return Object.keys(user || {}).length > 0 && user.authentication_token;
  }

  public static getToken() {
    let user = UserSession.getCurrentUser();
    if (user) {
      return user.authentication_token;
    } else {
      return '';
    }
  }

  public static setFcmToken(token) {
    localStorage.setItem('fcm_token', token);
  }

  public static getFcmToken() {
    return localStorage.getItem('fcm_token');
  }
}
