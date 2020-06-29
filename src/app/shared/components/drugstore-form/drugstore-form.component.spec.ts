import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { DrugstoreFormComponent } from './drugstore-form.component';

describe('DrugstoreFormComponent', () => {
  let component: DrugstoreFormComponent;
  let fixture: ComponentFixture<DrugstoreFormComponent>;

  beforeEach(async(() => {
    initializeComponent()
  }));

  beforeEach(() => {
    createComponent()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('contains drugstore attributes', () => {
    expect(fixture.debugElement.nativeElement.textContent).toContain('PHARMACEUTICAL_NAME')
    expect(fixture.debugElement.nativeElement.textContent).toContain('PHARMACEUTICAL_ID')
  });

  ////////////////////////////////////////////

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule().compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(DrugstoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
