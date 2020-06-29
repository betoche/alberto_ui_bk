import * as $ from 'jquery';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EditProfileComponent } from './edit-profile.component';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { DataHelper } from 'app/shared/spec/data-helper';

import { ProfileService } from 'app/shared/services/profile.service';

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;

  beforeEach(async(() => {
    setCurrentUser();
    initializeComponent();
  }));

  beforeEach(() => {
    createComponent();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('UPDATE profile', () => {
    it('fills form fields and clicks on submit button', fakeAsync(() => {
      let service = stubRequestUpdate();
      spyOn(component, 'showUpdateMessageSuccessful');

      component.form.get('name').setValue('my name');
      component.form.get('password').setValue('1234678');
      component.form.get('password_confirmation').setValue('1234678');
      component.form.get('secondary_phone_country').setValue('vn');
      component.form.get('secondary_phone_number').setValue('12345678');
      fixture.detectChanges();
      fixture.debugElement.nativeElement.querySelector('#submit-btn').click();

      expect(service.updateProfile).toHaveBeenCalled();
      tick();
      fixture.detectChanges();
      expect(component.showUpdateMessageSuccessful).toHaveBeenCalled();
    }));
  });

  // ##########################

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule(
      Object.assign(
        {
          imports: [RouterTestingModule.withRoutes([])],
          declarations: [EditProfileComponent]
        },
        options
      )
    ).compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function stubRequestUpdate() {
    let service = TestBed.get(ProfileService);
    spyOn(service, 'updateProfile').and.callFake(() => {
      return of(DataHelper.userData);
    });

    return service;
  }

  function setCurrentUser() {
    localStorage.setItem('current_user', JSON.stringify(DataHelper.userData['data']['attributes']));
  }
});
