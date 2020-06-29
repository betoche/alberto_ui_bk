import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { SecurePasswordInputComponent } from './secure-password-input.component';

describe('SecurePasswordInputComponent', () => {
  let component: SecurePasswordInputComponent;
  let fixture: ComponentFixture<SecurePasswordInputComponent>;

  beforeEach(async(() => {
   initializeComponent()
  }));

  beforeEach(() => {
    createComponent()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has password field', () => {
    let inputEl = fixture.debugElement.query(By.css('.mat-input-element'));
    expect(inputEl).toBeTruthy();
  });

  it('fills to password field and clicks on show password icon', () => {
    component.parentForm.get('password').setValue('1234678');
    fixture.detectChanges();
    expect(component.objectField.parent.value.password).toBe('1234678');

    fixture.debugElement.nativeElement.querySelector('.mat-icon').click();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.mat-input-element').getAttribute('type')).toBe('text');
  });

  /////////////////////////

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule().compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(SecurePasswordInputComponent);
    component = fixture.componentInstance;

    component.name = 'password'
    component.objectField = {
      parent: new FormGroup({
        password: new FormControl('', [])
      })
    };

    fixture.detectChanges();
  }
});
