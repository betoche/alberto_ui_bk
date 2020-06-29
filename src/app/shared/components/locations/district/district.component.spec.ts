import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { DistrictComponent } from './district.component';

describe('DistrictComponent', () => {
  let component: DistrictComponent;
  let fixture: ComponentFixture<DistrictComponent>;

  beforeEach(async(() => {
   initializeComponent()
  }));

  beforeEach(() => {
    createComponent()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have district_code field', () => {
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
    fixture = TestBed.createComponent(DistrictComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      district_code: new FormControl('', []),
      country_code: new FormControl('', []),
      province_code: new FormControl('', []),
      canton_code: new FormControl('', []),
    })

    fixture.detectChanges();
  }
});

