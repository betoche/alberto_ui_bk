import * as $ from 'jquery';
import { of } from 'rxjs';

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { DataHelper } from 'app/shared/spec/data-helper';

import { LoyaltyPlansService } from 'app/services/loyalty-plan/loyalty-plan.service';
import { LoyaltyPlanCountryService } from 'app/services/loyalty-plan-country/loyalty-plan-country.service';
import { ParticipatingDrugstoresService } from 'app/services/participating_drugstores.service';
import { ParticipatingDrugstoresComponent } from './participating-drugstores.component';

describe('ParticipatingDrugstoresComponent', () => {
  let component: ParticipatingDrugstoresComponent;
  let fixture: ComponentFixture<ParticipatingDrugstoresComponent>;

  beforeEach(async(() => {
    initializeComponent();
  }));

  beforeEach(() => {
    createComponent();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get loyalty plan country', fakeAsync(() => {
    stubRequestFetchLoyaltyPlan()
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

  it('should show list of participating drugstores', fakeAsync(() => {
    let service = stubRequestFetchListParticipatingDrugstores()
    createComponent();
    tick(1000);
    expect(service.fetchList).toHaveBeenCalled();
    expect(fixture.debugElement.nativeElement.textContent).toContain('Rodríquez, Acevedo y Carrasco Asociados')
  }))

  // ##########################

  function initializeComponent(options = {}){
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule(
      Object.assign({
        declarations: [ ParticipatingDrugstoresComponent ]
      }, options)
    ).compileComponents()
  }

  function createComponent() {
    fixture = TestBed.createComponent(ParticipatingDrugstoresComponent);
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

  function stubRequestFetchListParticipatingDrugstores() {
    let service = TestBed.get(ParticipatingDrugstoresService);
    spyOn(service, 'fetchList').and.callFake( () => {
      return of(DataHelper.ParticipatingDrigstores());
    });

    return service
  }
});
