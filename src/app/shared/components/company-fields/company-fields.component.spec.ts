import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { CompanyFieldsComponent } from './company-fields.component';
import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { UserWithCompanyFormHepler } from 'app/shared/helpers/user_with_company_form.helper';

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
      company: new FormGroup(UserWithCompanyFormHepler.companyFields()),
    });

    fixture.detectChanges();
  }
});