import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { UserSession } from 'app/shared/services/user-session';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if( UserSession.isSignedIn() ){
      return true
    }

    this.router.navigate(['/sessions/sign_in']);
    return false;
  }
}