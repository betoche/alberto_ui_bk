import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ConfirmationComponent } from './confirmation.component';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { DataHelper } from 'app/shared/spec/data-helper';

import { UserService } from 'app/shared/services/user.service';

describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;

  beforeEach(async(() => {
    TestBedHelper.configureTestingModule({
      declarations: [ConfirmationComponent],
      route_params: { token: '123456789xxx' }
    }).compileComponents();
  }));

  beforeEach(() => {
    stubRequestVerifyToken()
    createComponent();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit button', () => {

    let element = fixture.debugElement.nativeElement.querySelector('#submit');
    expect(element.disabled).toBeTruthy();

    component.form.get('password').setValue('12346789');
    component.form.get('password_confirmation').setValue('1234678');
    component.form.get('isTCAccepted').setValue(true);

    fixture.detectChanges();
    expect(element.disabled).toBeTruthy();

    component.form.get('password').setValue('A1234678@');
    component.form.get('password_confirmation').setValue('A1234678@');
    component.form.get('isTCAccepted').setValue(true);
    fixture.detectChanges();
    expect(element.disabled).toBeFalsy();
  });

  it('shows an error with an invalid token', fakeAsync(() => {
    let userService = TestBed.get(UserService);

    spyOn(userService, 'confirmationUser').and.callFake((password, token) => {
      if (password == 'A12345678@' && token == '123456789xxx') return throwError({ error: { message: 'token invalid' } });
    });

    component.form.get('password').setValue('A12345678@');
    component.form.get('password_confirmation').setValue('A12345678@');
    component.form.get('isTCAccepted').setValue(true);
    fixture.detectChanges();

    fixture.debugElement.nativeElement.querySelector('#submit').click();
    tick();
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.querySelector('.form-error-msg').textContent).toContain('token invalid');
  }));

  it('redirects to sign in page', fakeAsync(() => {
    let userService = TestBed.get(UserService);

    spyOn(userService, 'confirmationUser').and.callFake((password, token) => {
      if (password == 'A12345678@' && token == '123456789xxx') return of(DataHelper.userData);
    });

    let router = TestBed.get(Router);
    spyOn(router, 'navigateByUrl').and.callFake(() => {});

    component.form.get('password').setValue('A12345678@');
    component.form.get('password_confirmation').setValue('A12345678@');
    component.form.get('isTCAccepted').setValue(true);
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#submit').click();
    tick();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/sessions/sign_in');
  }));

  ////////////////

  function createComponent() {
    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function stubRequestVerifyToken(){
    let service = TestBed.get(UserService);
    spyOn(service, 'validPasswordToken').and.callFake( () => {
      return of({
        email: 'abc@gmail.com'
      });
    });

    return service
  }
});
