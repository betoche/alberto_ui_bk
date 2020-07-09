const Many = require('extends-classes');
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DatatableBaseComponent } from 'app/shared/components/datatable.base.component';
import { ApplicationBaseComponent } from 'app/shared/components/application.base.component';
import { LoyaltyPlansService } from 'app/services/loyalty-plan/loyalty-plan.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { LoyaltyPlanMedicationService } from 'app/services/loyalty-plan-medication/loyalty-plan-medication.service';
import { LoyaltyPlanModel } from 'app/shared/models/pharmaceutical-company/loyalty-plan.model';
import { LoyaltyPlanMedicationModel } from 'app/shared/models/loyalty-plan-medication/loyalty-plan-medication.model';
import { MedicationService } from 'app/services/medication/medication.service';
import { MedicationModel } from 'app/shared/models/medication/medication.model';
import { CountryModel } from 'app/shared/models/country/country.model';
import { CountriesService } from 'app/services/countries.service';
import { LoyaltyPlanCountryService } from 'app/services/loyalty-plan-country/loyalty-plan-country.service';
import { LoyaltyPlanCountryModel } from 'app/shared/models/loyalty-plan-country/loyalty-plan-country.model';

import * as _ from 'lodash';

@Component({
  selector: 'app-loyalty-plan-detail',
  templateUrl: './loyalty-plan-detail.component.html',
  styleUrls: ['./loyalty-plan-detail.component.scss']
})
export class LoyaltyPlanDetailComponent extends Many(
  ApplicationBaseComponent, DatatableBaseComponent) implements OnInit {

  public loyaltyPlan: any={};
  public loyaltyPlanMedications: any=[];
  public medications: any=[];
  public loyaltyPlanCountries: any=[];
  public countries: any=[];

  constructor(
    private loader: AppLoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private loyaltyPlansService: LoyaltyPlansService,
    private loyaltyPlanMedicationService: LoyaltyPlanMedicationService,
    private medicationService: MedicationService,
    private countriesService: CountriesService,
    private loyaltyPlanCountryService: LoyaltyPlanCountryService,
  ) {
    super();
  }

  ngOnInit() {
    this.setLoyaltyPlan();
    this.getMedications()
    this.getCountries()
  }

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////// ACTIONS FOR LOYALTY PLAN MEDICATION ////////////////////
  public addLoyaltyPlanMedication() {
    let loyaltyPlanMedication = new LoyaltyPlanMedicationModel({loyalty_plan_id: this.loyaltyPlan.id})
    loyaltyPlanMedication = Object.assign(loyaltyPlanMedication, {
      'isChanged': true
    })

    let loyaltyPlanMedications = _.cloneDeep(this.loyaltyPlanMedications)
    loyaltyPlanMedications.push(loyaltyPlanMedication)
    this.loyaltyPlanMedications = loyaltyPlanMedications
  }

  public onChangeMedication($event, rowIndex) {
    let loyaltyPlanMedications = _.cloneDeep(this.loyaltyPlanMedications)
    loyaltyPlanMedications[rowIndex]['medication_id'] = $event.value
    this.loyaltyPlanMedications = loyaltyPlanMedications
  }

  public saveLoyaltyPlanMedication(loyaltyPlanMedication, rowIndex) {
    if (!!loyaltyPlanMedication.id) {
      this.updateLoyaltyPlanMedication(loyaltyPlanMedication, rowIndex)
    } else {
      this.createLoyaltyPlanMedication(loyaltyPlanMedication, rowIndex)
    }
  }

  public setChangeToLoyaltyPlanMedication(rowIndex) {
    let loyaltyPlanMedications = _.cloneDeep(this.loyaltyPlanMedications)
    loyaltyPlanMedications[rowIndex]['isChanged'] = true
    this.loyaltyPlanMedications = loyaltyPlanMedications
  }

  public deactivateLoyaltyPlanMedication(loyaltyPlanMedication, rowIndex) {
    loyaltyPlanMedication.status = 'inactive'
    this.updateLoyaltyPlanMedication(loyaltyPlanMedication, rowIndex)
  }

  public activateLoyaltyPlanMedication(loyaltyPlanMedication, rowIndex) {
    loyaltyPlanMedication.status = 'active'
    this.updateLoyaltyPlanMedication(loyaltyPlanMedication, rowIndex)
  }

  private updateLoyaltyPlanMedication(loyaltyPlanMedication, rowIndex) {
    let loyaltyPlanMedications = _.cloneDeep(this.loyaltyPlanMedications)

    this.loyaltyPlanMedicationService.update(
      loyaltyPlanMedication.id, loyaltyPlanMedication
    ).subscribe((response) => {
      loyaltyPlanMedications[rowIndex] = new LoyaltyPlanMedicationModel(response['data']['attributes'])
      this.loyaltyPlanMedications = loyaltyPlanMedications
    })
  }

  private createLoyaltyPlanMedication(loyaltyPlanMedication, rowIndex) {
    let loyaltyPlanMedications = _.cloneDeep(this.loyaltyPlanMedications)

    this.loyaltyPlanMedicationService.create(loyaltyPlanMedication).subscribe( response => {
      loyaltyPlanMedications[rowIndex] = new LoyaltyPlanMedicationModel(response['data']['attributes'])
      this.loyaltyPlanMedications = loyaltyPlanMedications
    })
  }

  private setLoyaltyPlan() {
    this.loyaltyPlansService.fetch().subscribe( response => {
      this.loyaltyPlan = new LoyaltyPlanModel(response['data']['attributes'])
      this.getLoyalPlanMedications()
      this.getLoyaltyPlanCountries()
    });
  }

  private getLoyalPlanMedications() {
    this.loyaltyPlanMedicationService.fetchList().subscribe((response) => {
      this.loyaltyPlanMedications = LoyaltyPlanMedicationModel.buildFrom(_.map(response['data'], 'attributes'));
    })
  }

  private getMedications() {
    this.medicationService.fetchList().subscribe(
      response => {
        this.medications = MedicationModel.buildFrom(_.map(response['data'], 'attributes'));
      },
      _error => {
        this.rows = [];
      }
    );
  }

  public isMedicationSelected(medication) {
    let selectedMedication = _.find(this.loyaltyPlanMedications, { medication_id: medication.id })
    return !!selectedMedication
  }

  /////////////////////// END ACTIONS FOR LOYALTY PLAN MEDICATION ////////////////
  ////////////////////////////////////////////////////////////////////////////////

  private getCountries() {
    this.countriesService.fetchList().subscribe(
      response => {
        this.countries = CountryModel.buildFrom(response);
      },
      _error => {
        this.rows = [];
      }
    );
  }

  public addLoyaltyPlanCountry() {
    let loyaltyPlanCountry = new LoyaltyPlanCountryModel({loyalty_plan_id: this.loyaltyPlan.id})
    loyaltyPlanCountry = Object.assign(loyaltyPlanCountry, {
      'isChanged': true
    })

    let loyaltyPlanCountries = _.cloneDeep(this.loyaltyPlanCountries)
    loyaltyPlanCountries.push(loyaltyPlanCountry)
    this.loyaltyPlanCountries = loyaltyPlanCountries
  }

  public onChangeCountry($event, rowIndex) {
    let loyaltyPlanCountries = _.cloneDeep(this.loyaltyPlanCountries)
    loyaltyPlanCountries[rowIndex]['medication_id'] = $event.value
    this.loyaltyPlanCountries = loyaltyPlanCountries
  }

  public saveLoyaltyPlanCountry(loyaltyPlanCountry, rowIndex) {
    if (!!loyaltyPlanCountry.id) {
      this.updateLoyaltyPlanCountry(loyaltyPlanCountry, rowIndex)
    } else {
      this.createLoyaltyPlanCountry(loyaltyPlanCountry, rowIndex)
    }
  }

  public setChangeToLoyaltyPlanCountry(rowIndex) {
    let loyaltyPlanCountries = _.cloneDeep(this.loyaltyPlanCountries)
    loyaltyPlanCountries[rowIndex]['isChanged'] = true
    this.loyaltyPlanCountries = loyaltyPlanCountries
  }

  public isCountrySelected(country){
    return !!_.find(this.loyaltyPlanCountries, { country_code: country.code });
  }

  public deactivateLoyaltyPlanCountry(loyaltyPlanCountry, rowIndex) {
    loyaltyPlanCountry.status = 'inactive'
    this.updateLoyaltyPlanCountry(loyaltyPlanCountry, rowIndex)
  }

  public activateLoyaltyPlanCountry(loyaltyPlanCountry, rowIndex) {
    loyaltyPlanCountry.status = 'active'
    this.updateLoyaltyPlanCountry(loyaltyPlanCountry, rowIndex)
  }

  private updateLoyaltyPlanCountry(loyaltyPlanCountry, rowIndex) {
    let loyaltyPlanCountries = _.cloneDeep(this.loyaltyPlanCountries)

    this.loyaltyPlanCountryService.update(loyaltyPlanCountry.id, loyaltyPlanCountry).subscribe((response) => {
      loyaltyPlanCountries[rowIndex] = new LoyaltyPlanCountryModel(response['data']['attributes'])
      this.loyaltyPlanCountries = loyaltyPlanCountries
    })
  }

  private createLoyaltyPlanCountry(loyaltyPlanCountry, rowIndex) {
    let loyaltyPlanCountries = _.cloneDeep(this.loyaltyPlanCountries)

    this.loyaltyPlanCountryService.create(loyaltyPlanCountry).subscribe( response => {
      loyaltyPlanCountries[rowIndex] = new LoyaltyPlanCountryModel(response['data']['attributes'])
      this.loyaltyPlanCountries = loyaltyPlanCountries
    })
  }

  private getLoyaltyPlanCountries() {
    this.loyaltyPlanCountryService.fetchList().subscribe((response) => {
      this.loyaltyPlanCountries = LoyaltyPlanCountryModel.buildFrom(_.map(response['data'], 'attributes'));
    })
  }

}
