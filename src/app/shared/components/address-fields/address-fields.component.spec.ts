import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AddressFieldsComponent } from './address-fields.component';
import { TestBedHelper } from 'spec/test-bed/test-bed-helper';

describe('AddressFieldsComponent', () => {
  let component: AddressFieldsComponent;
  let fixture: ComponentFixture<AddressFieldsComponent>;

  beforeEach(async(() => {
    initializeComponent()
  }));

  beforeEach(inject([FormBuilder], (fb: FormBuilder) => {
    createComponent(fb)
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('contains address attributes', () => {
    expect(fixture.debugElement.nativeElement.textContent).toContain('COUNTRY');
    expect(fixture.debugElement.nativeElement.textContent).toContain('PROVINCE');
    expect(fixture.debugElement.nativeElement.textContent).toContain('CANTON');
    expect(fixture.debugElement.nativeElement.textContent).toContain('DISTRICT');
    expect(fixture.debugElement.nativeElement.textContent).toContain('SUBURB');
    expect(fixture.debugElement.nativeElement.textContent).toContain('ADDRESS');
  });

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule().compileComponents();
  }

  function createComponent(fb) {
    fixture = TestBed.createComponent(AddressFieldsComponent);
    component = fixture.componentInstance;

    component.form = fb.group({
      address_attributes: new FormGroup({
        id: new FormControl('', []),
        note: new FormControl('', []),
        country_code: new FormControl('', [Validators.required]),
        province_code: new FormControl('', [Validators.required]),
        canton_code: new FormControl('', [Validators.required]),
        district_code: new FormControl('', [Validators.required]),
        suburb_code: new FormControl('', [Validators.required])
      })
    });

    fixture.detectChanges();
  }
});
