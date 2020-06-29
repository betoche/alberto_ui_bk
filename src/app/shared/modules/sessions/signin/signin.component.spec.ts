import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SigninComponent } from 'app/shared/modules/sessions/signin/signin.component';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { AppHelper } from 'spec/app-helper';
import { DataHelper } from 'app/shared/spec/data-helper';

import { UserService } from 'app/shared/services/user.service';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async(() => {
    TestBedHelper.configureTestingModule({
      declarations: [SigninComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit button and enable it after filled inputs', () => {
    let element = fixture.debugElement.nativeElement.querySelector('#submit');
    expect(element.disabled).toBeTruthy();

    component.signinForm.get('email').setValue('email@example.com');
    component.signinForm.get('password').setValue('12345678');

    fixture.detectChanges();
    expect(element.disabled).toBeFalsy();
  });

  it('should go to dashboard page', fakeAsync(() => {
    let userService = TestBed.get(UserService);

    spyOn(userService, 'signIn').and.returnValue(of(DataHelper.userData));

    component.signinForm.get('email').setValue('email@example.com');
    component.signinForm.get('password').setValue('12345678');
    fixture.detectChanges();

    let router = TestBed.get(Router);
    spyOn(router, 'navigateByUrl').and.callFake(() => {});

    fixture.debugElement.nativeElement.querySelector('#submit').click();
    tick();

    expect(router.navigateByUrl).toHaveBeenCalledWith('dashboard');
  }));

  it('should show an error', fakeAsync(() => {
    let userService = TestBed.get(UserService);

    spyOn(userService, 'signIn').and.returnValue(throwError({ error: { message: 'email invalid' } }));

    component.signinForm.get('email').setValue('email@example.com');
    component.signinForm.get('password').setValue('12345678');
    fixture.detectChanges();

    let router = TestBed.get(Router);

    fixture.debugElement.nativeElement.querySelector('#submit').click();
    tick();

    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.querySelector('.top-message-form')).toBeTruthy();
  }));
});
