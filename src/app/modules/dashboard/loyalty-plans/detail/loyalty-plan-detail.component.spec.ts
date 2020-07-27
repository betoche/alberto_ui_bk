import * as $ from 'jquery';
import { of } from 'rxjs';

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { DataHelper } from 'app/shared/spec/data-helper';

import { LoyaltyPlanDetailComponent } from './loyalty-plan-detail.component';
import { LoyaltyPlansService } from 'app/services/loyalty-plan/loyalty-plan.service';
import { LoyaltyPlanMedicationService } from 'app/services/loyalty-plan-medication/loyalty-plan-medication.service';
import { LoyaltyPlanCountryService } from 'app/services/loyalty-plan-country/loyalty-plan-country.service';

describe('LoyaltyPlanDetailComponent', () => {
  let component: LoyaltyPlanDetailComponent;
  let fixture: ComponentFixture<LoyaltyPlanDetailComponent>;

  beforeEach(async(() => {
    initializeComponent();
  }));

  beforeEach(() => {
    createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show detail of loyalty plan', fakeAsync(() => {
    let service = stubRequestFetch();
    createComponent();
    expect(service.fetch).toHaveBeenCalled();
    tick(1000);
    expect($('.headline').text()).toContain('LOYALTY_PLAN');
    expect($('.headline-information').text()).toContain('my plan');
    expect($('.body-description-item').text()).toContain('my plan description');
  }))

  it('should show list of loyalty plan medications', fakeAsync(() => {
    let loyaltyPlanService = stubRequestFetch();
    let loyaltyPlanMeicationService = stubRequestFetchListLoyaltyPlanMedications();
    createComponent();
    expect(loyaltyPlanService.fetch).toHaveBeenCalled();
    expect(loyaltyPlanMeicationService.fetchList).toHaveBeenCalled();
    tick(1000);
    expect($('.loyalty-plan-medications-container datatable-row-wrapper:first-child').text()).toContain('Teodoro');
    expect($('.loyalty-plan-medications-container datatable-row-wrapper:first-child').text()).toContain('5eaf7bb');
  }))

  it('should show list of loyalty plan countries', fakeAsync(() => {
    let loyaltyPlanService = stubRequestFetch();
    let loyaltyPlanCountryService = stubRequestFetchListLoyaltyPlanCountries();
    createComponent();
    expect(loyaltyPlanService.fetch).toHaveBeenCalled();
    expect(loyaltyPlanCountryService.fetchList).toHaveBeenCalled();
    tick(1000);
    expect($('.loyalty-plan-country-container datatable-row-wrapper:first-child').text()).toContain('Costa Rica');
  }))

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule(
      Object.assign(
        {
          declarations: [LoyaltyPlanDetailComponent]
        },
        options
      )
    ).compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(LoyaltyPlanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function stubRequestFetchList() {
    let service = TestBed.get(LoyaltyPlansService);
    spyOn(service, 'fetchList').and.callFake(() => {
      return of(DataHelper.loyaltyPlans());
    });
  }

  function stubRequestFetch(){
    let service = TestBed.get(LoyaltyPlansService);
    spyOn(service, 'fetch').and.callFake( () => {
      return of(DataHelper.loyaltyPlan());
    });

    return service
  }

  function stubRequestFetchListLoyaltyPlanMedications(){
    let service = TestBed.get(LoyaltyPlanMedicationService);
    spyOn(service, 'fetchList').and.callFake( () => {
      return of(DataHelper.LoyaltyPlanMedications());
    });

    return service
  }

  function stubRequestFetchListLoyaltyPlanCountries(){
    let service = TestBed.get(LoyaltyPlanCountryService);
    spyOn(service, 'fetchList').and.callFake( () => {
      return of(DataHelper.LoyaltyPlanCountries());
    });

    return service
  }

});
