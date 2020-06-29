import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ResetPasswordComponent } from 'app/shared/modules/sessions/reset-password/reset-password.component';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { AppHelper } from 'spec/app-helper';
import { DataHelper } from 'app/shared/spec/data-helper';

import { UserService } from 'app/shared/services/user.service';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBedHelper.configureTestingModule({
      declarations: [ResetPasswordComponent],
      route_params: { token: '123456789xxx' }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit button', () => {
    let element = fixture.debugElement.nativeElement.querySelector('#submit');
    expect(element.disabled).toBeTruthy();

    component.form.get('password').setValue('12346789');
    component.form.get('password_confirmation').setValue('1234678');
    fixture.detectChanges();
    expect(element.disabled).toBeTruthy();

    component.form.get('password').setValue('A1234678@');
    component.form.get('password_confirmation').setValue('A1234678@');
    fixture.detectChanges();
    expect(element.disabled).toBeFalsy();
  });

  it('shows an error with an invalid token', fakeAsync(() => {
    let userService = TestBed.get(UserService);

    spyOn(userService, 'resetPassword').and.callFake((password, token) => {
      if (password == 'A12345678@' && token == '123456789xxx') return throwError({ error: { message: 'token invalid' } });
    });

    component.form.get('password').setValue('A12345678@');
    component.form.get('password_confirmation').setValue('A12345678@');
    fixture.detectChanges();

    fixture.debugElement.nativeElement.querySelector('#submit').click();
    tick();
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.querySelector('.form-error-msg').textContent).toContain('token invalid');
  }));

  it('redirects to sign in page', fakeAsync(() => {
    let userService = TestBed.get(UserService);

    spyOn(userService, 'resetPassword').and.callFake((password, token) => {
      if (password == 'A12345678@' && token == '123456789xxx') return of(DataHelper.userData);
    });

    let router = TestBed.get(Router);
    spyOn(router, 'navigateByUrl').and.callFake(() => {});

    component.form.get('password').setValue('A12345678@');
    component.form.get('password_confirmation').setValue('A12345678@');
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#submit').click();
    tick();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/sessions/sign_in');
  }));
});
