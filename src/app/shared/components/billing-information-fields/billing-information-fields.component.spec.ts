import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BillingInformationFieldsComponent } from './billing-information-fields.component';

describe('BillingInformationFieldsComponent', () => {
  let component: BillingInformationFieldsComponent;
  let fixture: ComponentFixture<BillingInformationFieldsComponent>;

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
    expect(fixture.debugElement.nativeElement.textContent).toContain('BILLING_INFORMATION');
    expect(fixture.debugElement.nativeElement.textContent).toContain('BUSINESS_NAME *');
    expect(fixture.debugElement.nativeElement.textContent).toContain('GOVERNMENT_ID_TYPE *');
    expect(fixture.debugElement.nativeElement.textContent).toContain('LEGAL_NOTE');
    expect(fixture.debugElement.nativeElement.textContent).toContain('TELEPHONE_1 *');
    expect(fixture.debugElement.nativeElement.textContent).toContain('EMAIL *');
    expect(fixture.debugElement.nativeElement.textContent).toContain('COUNTRY *');
    expect(fixture.debugElement.nativeElement.textContent).toContain('PROVINCE *');
    expect(fixture.debugElement.nativeElement.textContent).toContain('CANTON *');
    expect(fixture.debugElement.nativeElement.textContent).toContain('DISTRICT');
  });

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule().compileComponents();
  }

  function createComponent(fb) {
    fixture = TestBed.createComponent(BillingInformationFieldsComponent);
    component = fixture.componentInstance;

    component.form = fb.group({
      billing_information_attributes: new FormGroup({
        id: new FormControl('', [] ),
        company_name: new FormControl('', [Validators.required]),
        legal_note: new FormControl(''),
        email: new FormControl('', [Validators.required]),
        government_id_type: new FormControl('', [Validators.required]),
        phone_number: new FormControl('', [Validators.required]),
        phone_country: new FormControl('', [Validators.required]),
        country_code: new FormControl('', [Validators.required]),
        province_code: new FormControl('', [Validators.required]),
        canton_code: new FormControl('', [Validators.required]),
        district_code: new FormControl('', [Validators.required]),
        suburb_code: new FormControl('', [Validators.required]),
        note: new FormControl('', [Validators.required])
      })
    });

    fixture.detectChanges();
  }
});
