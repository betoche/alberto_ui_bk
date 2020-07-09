import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatablePageLimitComponent } from './datatable-page-limit.component';
import { TestBedHelper } from 'spec/test-bed/test-bed-helper';

describe('DatatablePageLimitComponent', () => {
  let component: DatatablePageLimitComponent;
  let fixture: ComponentFixture<DatatablePageLimitComponent>;

  beforeEach(async(() => {
    initializeComponent()
  }));

  beforeEach(() => {
    createComponent()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  ////////////////////////////////////////////

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule().compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(DatatablePageLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
