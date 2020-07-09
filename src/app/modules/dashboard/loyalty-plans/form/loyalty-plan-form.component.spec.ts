import * as $ from 'jquery';
import { of } from 'rxjs';

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { DataHelper } from 'app/shared/spec/data-helper';

import { LoyaltyPlanFormComponent } from './loyalty-plan-form.component';
import { LoyaltyPlansService } from 'app/services/loyalty-plan/loyalty-plan.service';
class LoyaltyPlansComponent {}

describe('LoyaltyPlanFormComponent', () => {
  let component: LoyaltyPlanFormComponent;
  let fixture: ComponentFixture<LoyaltyPlanFormComponent>;

  describe("#New", () => {
    beforeEach(async(() => {
      initializeComponent();
    }));

    beforeEach(() => {
      createComponent();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should create a new loyalty plan', () => {
      let service = stubRequestCreate();
      component.form.get('name').setValue('my plan');
      component.form.get('description').setValue('description');
      component.form.get('logo_url').setValue('http://abc.com');
      component.form.get('website_url').setValue('http://abc.com');
      component.form.get('exchange_rule').setValue('boxes');
      component.form.get('regulation_url').setValue('http://abc.com');
      component.form.get('terms_and_conditions_url').setValue('http://abc.com');
      component.form.get('rewards_expiration_date').setValue(new Date());
      component.submit()
      expect(service.create).toHaveBeenCalledWith(component.form.value);
    });
  })

  describe("#Update", () => {
    beforeEach(async(() => {
      initializeComponent({route_params: {id: 'qwertyuiop'}})
    }));

    beforeEach(() => {
      stubRequestFetch();
      createComponent();
    });

    it('should update a loyalty plan', fakeAsync(() => {
      let service = stubRequestUpdate();
      component.form.get('name').setValue('my plan 1');
      component.form.get('rewards_expiration_date').setValue(new Date());
      component.submit()
      tick(1000)
      expect(service.update).toHaveBeenCalledWith('qwertyuiop', component.form.value);
    }));
  })


  // ##########################

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule(
      Object.assign({
        imports: [
          RouterTestingModule.withRoutes([
            { path: 'dashboard/loyalty-plans', component: LoyaltyPlansComponent }
          ])
        ],
        declarations: [LoyaltyPlanFormComponent]
      }, options)
    ).compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(LoyaltyPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function stubRequestFetch() {
    let service = TestBed.get(LoyaltyPlansService);
    spyOn(service, 'fetch').and.callFake(() => {
      return of(DataHelper.loyaltyPlan({id: 'qwertyuiop'}));
    });
  }

  function stubRequestCreate(){
    let service = TestBed.get(LoyaltyPlansService);
    spyOn(service, 'create').and.callFake( () => {
      return of(DataHelper.loyaltyPlan());
    });

    return service;
  }

  function stubRequestUpdate(){
    let service = TestBed.get(LoyaltyPlansService);
    spyOn(service, 'update').and.callFake( () => {
      return of(DataHelper.loyaltyPlan({id: 'qwertyuiop'}));
    });
    return service;
  }

});
