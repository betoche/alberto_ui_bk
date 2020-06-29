import * as $ from 'jquery';
import { of } from 'rxjs';

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { DataHelper } from 'app/shared/spec/data-helper';

import { MedicationsIncludedByCountryComponent } from './medications-included-by-country.component';

import { LoyaltyPlansService } from 'app/services/loyalty-plan/loyalty-plan.service';
import { LoyaltyPlanMedicationService } from 'app/services/loyalty-plan-medication/loyalty-plan-medication.service';
import { LoyaltyPlanCountryService } from 'app/services/loyalty-plan-country/loyalty-plan-country.service';

describe('MedicationsIncludedByCountryComponent', () => {
  let component: MedicationsIncludedByCountryComponent;
  let fixture: ComponentFixture<MedicationsIncludedByCountryComponent>;

  beforeEach(async(() => {
    initializeComponent();
  }));

  beforeEach(() => {
    createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get loyalty plan country', fakeAsync(() => {
    let service = stubRequestFetchLoyaltyPlanCountry();
    createComponent();
    expect(service.fetch).toHaveBeenCalled();
    tick(1000);
    expect($('.decoration-line').text()).toContain('Costa Rica');
  }))

  it('should get loyalty plan', () => {
    let service = stubRequestFetchLoyaltyPlan();
    createComponent();
    expect(service.fetch).toHaveBeenCalled();
  })

  it('should show list of loyalty plan medications', fakeAsync(() => {
    let service = stubRequestFetchListLoyaltyPlanMedications();
    createComponent();
    tick(1000);
    expect(service.fetchList).toHaveBeenCalled();
  }))

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule(
      Object.assign(
        {
          declarations: [MedicationsIncludedByCountryComponent]
        },
        options
      )
    ).compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(MedicationsIncludedByCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function stubRequestFetchLoyaltyPlanCountry() {
    let service = TestBed.get(LoyaltyPlanCountryService);
    spyOn(service, 'fetch').and.callFake( () => {
      return of(DataHelper.LoyaltyPlanCountry());
    });

    return service
  }

  function stubRequestFetchLoyaltyPlan() {
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
});
