import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { CantonComponent } from './canton.component';

describe('CantonComponent', () => {
  let component: CantonComponent;
  let fixture: ComponentFixture<CantonComponent>;

  beforeEach(async(() => {
   initializeComponent()
  }));

  beforeEach(() => {
    createComponent()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have canton_code field', () => {
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
    fixture = TestBed.createComponent(CantonComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      canton_code: new FormControl('', []),
      country_code: new FormControl('', []),
      province_code: new FormControl('', []),
    })

    fixture.detectChanges();
  }
});
