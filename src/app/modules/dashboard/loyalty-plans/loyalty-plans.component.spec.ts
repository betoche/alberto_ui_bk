import * as $ from 'jquery';
import { of } from 'rxjs';

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { DataHelper } from 'app/shared/spec/data-helper';

import { LoyaltyPlansComponent } from './loyalty-plans.component';
import { LoyaltyPlansService } from 'app/services/loyalty-plan/loyalty-plan.service';

describe('LoyaltyPlansComponent', () => {
  let component: LoyaltyPlansComponent;
  let fixture: ComponentFixture<LoyaltyPlansComponent>;

  beforeEach(async(() => {
    initializeComponent();
  }));

  beforeEach(() => {
    createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ##########################

  describe('#index', () => {
    beforeEach(() => {
      stubRequestFetchList();
      createComponent();
    });

    it('displays loyalty plans in the list', fakeAsync(() => {
      tick();
      expect($('datatable-row-wrapper').length).toEqual(1);
      expect($('datatable-row-wrapper:first-child').text()).toContain('my plan');
      expect($('datatable-row-wrapper:first-child').text()).toContain('my plan description');
    }));
  });

  // ##########################

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule(
      Object.assign(
        {
          declarations: [LoyaltyPlansComponent]
        },
        options
      )
    ).compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(LoyaltyPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function stubRequestFetchList() {
    let service = TestBed.get(LoyaltyPlansService);
    spyOn(service, 'fetchList').and.callFake(() => {
      return of(DataHelper.loyaltyPlans());
    });
  }
});
