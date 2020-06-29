import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ForgotPasswordComponent } from 'app/shared/modules/sessions/forgot-password/forgot-password.component';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { AppHelper } from 'spec/app-helper';

import { UserService } from 'app/shared/services/user.service';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBedHelper.configureTestingModule({
      declarations: [ForgotPasswordComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit button', () => {
    let element = fixture.debugElement.nativeElement.querySelector('#submit');
    expect(element.disabled).toBeTruthy();

    component.form.get('email').setValue('email@example.com');

    fixture.detectChanges();
    expect(element.disabled).toBeFalsy();
  });

  it('shows a message successful', fakeAsync(() => {
    let userService = TestBed.get(UserService);

    spyOn(userService, 'forgotPassword').and.callFake(email => {
      if (email == 'email@example.com') return of({ message: 'email was sent' });
    });

    component.form.get('email').setValue('email@example.com');

    fixture.detectChanges();

    fixture.debugElement.nativeElement.querySelector('#submit').click();
    tick();

    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.querySelector('.form-info-msg').textContent).toContain('email was sent');
  }));
});
