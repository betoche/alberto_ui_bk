import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { UserInfoFieldsComponent } from './user-info-fields.component';

describe('UserInfoFieldsComponent', () => {
  let component: UserInfoFieldsComponent;
  let fixture: ComponentFixture<UserInfoFieldsComponent>;

  beforeEach(async(() => {
   initializeComponent()
  }));

  beforeEach(() => {
    createComponent()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have user information fields', () => {
    expect(fixture.debugElement.nativeElement.textContent).toContain('USER_INFORMATION');
    expect(fixture.debugElement.nativeElement.textContent).toContain('NAME *');
    expect(fixture.debugElement.nativeElement.textContent).toContain('EMAIL *');
    expect(fixture.debugElement.nativeElement.textContent).toContain('TELEPHONE_1 *');
    expect(fixture.debugElement.nativeElement.textContent).toContain('TELEPHONE_2');
  });

  /////////////////////////

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule().compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(UserInfoFieldsComponent);
    component = fixture.componentInstance;

    component.form = new FormGroup({
      user: new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        phone_number: new FormControl(''),
        phone_country: new FormControl(''),
        secondary_phone_number: new FormControl(''),
        secondary_phone_country: new FormControl(''),
      }),
    })

    fixture.detectChanges();
  }
});
