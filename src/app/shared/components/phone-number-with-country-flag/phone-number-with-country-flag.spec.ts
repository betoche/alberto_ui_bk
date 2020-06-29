import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { PhoneNumberWithCountryFlagComponent } from './phone-number-with-country-flag.component';

describe('PhoneNumberWithCountryFlagComponent', () => {
  let component: PhoneNumberWithCountryFlagComponent;
  let fixture: ComponentFixture<PhoneNumberWithCountryFlagComponent>;

  beforeEach(async(() => {
     initializeComponent()
  }));

  beforeEach(() => {
    createComponent()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have phone fields', () => {
    let countryEl = fixture.debugElement.query(By.css('.country-flag-select'));
    let phoneNumberEl = fixture.debugElement.query(By.css('.phone-number-input '));
    expect(countryEl).toBeTruthy();
    expect(phoneNumberEl).toBeTruthy();
  });

  //////////////////////////////////

  function initializeComponent() {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule().compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(PhoneNumberWithCountryFlagComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    component.country = new FormControl('', [])
    component.number = new FormControl('', [])
    fixture.detectChanges();
  }
});
