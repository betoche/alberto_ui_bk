import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { PasswordInputComponent } from './password-input.component';

describe('PasswordInputComponent', () => {
  let component: PasswordInputComponent;
  let fixture: ComponentFixture<PasswordInputComponent>;

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

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule().compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(PasswordInputComponent);
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
