import { TestBed } from '@angular/core/testing';

import { UserSession } from 'app/shared/services/user-session';

describe('UserSession', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('sets current user data to localStorage', () => {
    let user = { id: 1, email: 'example.com' };
    UserSession.setCurrentUser(user);
    expect(localStorage.getItem('current_user')).toBe( JSON.stringify(user) );
  });
});
