import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { By } from '@angular/platform-browser';

import { InputDisabledWithIconComponent } from './input-disabled-with-icon.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

describe('InputDisabledWithIconComponent', () => {
  let component: InputDisabledWithIconComponent;
  let fixture: ComponentFixture<InputDisabledWithIconComponent>;

  beforeEach(async(() => {
    initializeComponent()
  }));

  beforeEach(() => {
    createComponent()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has input field with lock icon', () => {
    let inputEl = fixture.debugElement.query(By.css('.mat-input-element'));
    expect(inputEl).toBeTruthy();
  });

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule().compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(InputDisabledWithIconComponent);
    component = fixture.componentInstance;
    component.controlName = 'test_control'
    const mockFormGroup: FormGroup = new FormGroup({test_control: new FormControl('', [])});
    component.parent.form = mockFormGroup;

    fixture.detectChanges();
  }
});
