import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { GovernmentIdTypesComponent } from './government-id-types.component';
import { TestBedHelper } from 'spec/test-bed/test-bed-helper';

describe('GovernmentIdTypesComponent', () => {
  let component: GovernmentIdTypesComponent;
  let fixture: ComponentFixture<GovernmentIdTypesComponent>;

  beforeEach(async(() => {
   initializeComponent()
  }));

  beforeEach(() => {
    createComponent()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('contains government-id-type attributes', () => {
    let inputEl = fixture.debugElement.query(By.css('.mat-form-field-type-mat-select'));
    expect(inputEl).toBeTruthy();
  });

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule().compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(GovernmentIdTypesComponent);
    component = fixture.componentInstance;

    component.form = new FormGroup({
      government_id_type: new FormControl(''),
    });

    fixture.detectChanges();
  }
});
