import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { CountryComponent } from './country.component';

describe('CountryComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;

  beforeEach(async(() => {
   initializeComponent()
  }));

  beforeEach(() => {
    createComponent()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have country_code field', () => {
    let inputEl = fixture.debugElement.query(By.css('.mat-form-field-type-mat-select'));
    expect(inputEl).toBeTruthy();
  });

  ////////////////////////////////////

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule().compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      country_code: new FormControl('', [])
    })

    fixture.detectChanges();
  }
});

