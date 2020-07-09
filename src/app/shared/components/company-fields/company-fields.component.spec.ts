import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { CompanyFieldsComponent } from './company-fields.component';
import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { FormHelper } from 'app/shared/helpers/form.helper';

describe('CompanyFieldsComponent', () => {
  let component: CompanyFieldsComponent;
  let fixture: ComponentFixture<CompanyFieldsComponent>;

  beforeEach(async(() => {
   initializeComponent()
  }));

  beforeEach(() => {
    createComponent()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('contains company attributes', () => {
    expect(fixture.debugElement.nativeElement.textContent).toContain('COUNTRY *')
    expect(fixture.debugElement.nativeElement.textContent).toContain('PROVINCE *')
    expect(fixture.debugElement.nativeElement.textContent).toContain('CANTON *')
    expect(fixture.debugElement.nativeElement.textContent).toContain('DISTRICT *')
    expect(fixture.debugElement.nativeElement.textContent).toContain('SUBURB *')
    expect(fixture.debugElement.nativeElement.textContent).toContain('ADDRESS_NOTE *')
    expect(fixture.debugElement.nativeElement.textContent).toContain('GOVERNMENT_ID_TYPE *')
    expect(fixture.debugElement.nativeElement.textContent).toContain('LEGAL_NOTE')
    expect(fixture.debugElement.nativeElement.textContent).toContain('TELEPHONE_1 *')
    expect(fixture.debugElement.nativeElement.textContent).toContain('EMAIL *')
  });


  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule().compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(CompanyFieldsComponent);
    component = fixture.componentInstance;

    component.form = new FormGroup({
      company: new FormGroup(FormHelper.companyFields()),
    });

    fixture.detectChanges();
  }
});