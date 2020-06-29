import { TestBed } from '@angular/core/testing';

import { UserSession } from 'app/shared/services/user-session';

describe('UserSession', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('sets current user data to localStorage', () => {
    let user = { id: 1, email: 'example.com' };
    UserSession.setCurrentUser(user);
    expect(localStorage.getItem('current_user')).toBe(JSON.stringify(user));
  });

  it('gets current user data from localStorage', () => {
    let user = { id: 1, email: 'example.com' };
    localStorage.setItem('current_user', JSON.stringify(user));
    UserSession.getCurrentUser();
    expect(localStorage.getItem('current_user')).toBe(JSON.stringify(user));
  });

  it('removes current user data from localStorage', () => {
    let user = { id: 1, email: 'example.com' };
    localStorage.setItem('current_user', JSON.stringify(user));
    UserSession.removeCurrentUser();
    expect(localStorage.getItem('current_user')).toBe(null);
  });

  it('should return true from isSignedIn when there is a current_user', () => {
    let user = { id: 1, email: 'example.com', authentication_token: 'xxxx' };
    localStorage.setItem('current_user', JSON.stringify(user));
    expect(UserSession.isSignedIn()).toBeTruthy();
  });

  it('should return false from isSignedIn when there is no token', () => {
    localStorage.removeItem('current_user');
    UserSession.currentUser = null;
    expect(UserSession.isSignedIn()).toBeFalsy();
  });

  it('should return authentication_token from if there is a user', () => {
    let user = { id: 1, email: 'example.com', authentication_token: 'xxxx' };
    localStorage.setItem('current_user', JSON.stringify(user));
    expect(UserSession.getToken()).toBe('xxxx');
  });

  it('should return empty from if there is no user', () => {
    localStorage.removeItem('current_user');
    UserSession.currentUser = null;
    expect(UserSession.getToken()).toBe('');
  });

  it('sets fcm_token data to localStorage', () => {
    let token = 'abc123';
    UserSession.setFcmToken(token);
    expect(localStorage.getItem('fcm_token')).toBe(token);
  });

  it('gets fcm_token data to localStorage', () => {
    let token = 'abc123';
    localStorage.setItem('fcm_token', token);
    UserSession.getFcmToken();
    expect(localStorage.getItem('fcm_token')).toBe(token);
  });
});
