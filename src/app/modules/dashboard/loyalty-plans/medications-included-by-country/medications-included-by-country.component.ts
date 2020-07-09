const Many = require('extends-classes');
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { egretAnimations } from 'app/shared/animations/egret-animations';

import { DatatableBaseComponent } from 'app/shared/components/datatable.base.component';
import { ApplicationBaseComponent } from 'app/shared/components/application.base.component';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

import { MedicationsIncludedByCountryModel } from 'app/shared/models/medications-included-by-country/medications-included-by-country.model';
import { MedicationsIncludedByCountryService } from 'app/services/medications-included-by-country/medications-included-by-country.service';
import { LoyaltyPlanCountryService } from 'app/services/loyalty-plan-country/loyalty-plan-country.service';
import { LoyaltyPlanMedicationModel } from 'app/shared/models/loyalty-plan-medication/loyalty-plan-medication.model';
import { LoyaltyPlanMedicationService } from 'app/services/loyalty-plan-medication/loyalty-plan-medication.service';
import { LoyaltyPlansService } from 'app/services/loyalty-plan/loyalty-plan.service';
import { LoyaltyPlanModel } from 'app/shared/models/pharmaceutical-company/loyalty-plan.model';
import { LoyaltyPlanCountryModel } from 'app/shared/models/loyalty-plan-country/loyalty-plan-country.model';

import * as _ from 'lodash';

@Component({
  selector: 'app-medications-included-by-country',
  animations: egretAnimations,
  templateUrl: './medications-included-by-country.component.html',
  styleUrls: ['./medications-included-by-country.component.scss']
})
export class MedicationsIncludedByCountryComponent extends Many(
  ApplicationBaseComponent, DatatableBaseComponent) implements OnInit {

  public loyaltyPlan: any={};
  public loyaltyPlanCountryId: string;
  public medicationsIncludedByCountry: any=[];
  public loyaltyPlanCountry: any={};
  public loyaltyPlanMedications: any=[];

  constructor(
    private loader: AppLoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private loyaltyPlansService: LoyaltyPlansService,
    private medicationsIncludedByCountryService: MedicationsIncludedByCountryService,
    private loyaltyPlanCountryService: LoyaltyPlanCountryService,
    private loyaltyPlanMedicationService: LoyaltyPlanMedicationService,
  ) {
    super();
  }

  ngOnInit() {
    this.loyaltyPlanCountryId = this.route.snapshot.params.loyalty_plan_country_id;

    this.getLoyaltyPlanCountry();
    this.getLoyaltyPlan()
    this.getLoyaltyPlanMedications()
  }

  public saveMedicationIncluded(medicationIncluded, rowIndex) {
    if (!!medicationIncluded.id) {
      this.updateMedicationIncluded(medicationIncluded, rowIndex)
    } else {
      this.createMedicationIncluded(medicationIncluded, rowIndex)
    }
  }

  public setChangeToMedicationIncluded(rowIndex) {
    let medicationsIncludedByCountry = _.cloneDeep(this.medicationsIncludedByCountry)
    medicationsIncludedByCountry[rowIndex]['isChanged'] = true
    this.medicationsIncludedByCountry = medicationsIncludedByCountry
  }

  public deactivateMedicationIncluded(medicationIncluded, rowIndex) {
    medicationIncluded.status = 'inactive'
    this.updateMedicationIncluded(medicationIncluded, rowIndex)
  }

  public activateMedicationIncluded(medicationIncluded, rowIndex) {
    medicationIncluded.status = 'active'
    this.updateMedicationIncluded(medicationIncluded, rowIndex)
  }

  public onInputChange(value, attrName, rowIndex) {
    let medicationsIncludedByCountry = _.cloneDeep(this.medicationsIncludedByCountry)
    medicationsIncludedByCountry[rowIndex][attrName] = value
    this.medicationsIncludedByCountry = medicationsIncludedByCountry
  }

  private updateMedicationIncluded(medicationIncluded, rowIndex) {
    let medicationsIncludedByCountry = _.cloneDeep(this.medicationsIncludedByCountry)

    this.medicationsIncludedByCountryService.update(
      this.loyaltyPlanCountryId, medicationIncluded.id, medicationIncluded
    ).subscribe((response) => {
      medicationsIncludedByCountry[rowIndex] = new MedicationsIncludedByCountryModel(response['data']['attributes'])
      this.medicationsIncludedByCountry = medicationsIncludedByCountry
    }, errorResponse => {
      alert(errorResponse.error.errors)
    })
  }

  private createMedicationIncluded(medicationIncluded, rowIndex) {
    let medicationsIncludedByCountry = _.cloneDeep(this.medicationsIncludedByCountry)

    this.medicationsIncludedByCountryService.create(
      this.loyaltyPlanCountryId, medicationIncluded
    ).subscribe(response => {
      medicationsIncludedByCountry[rowIndex] = new MedicationsIncludedByCountryModel(response['data']['attributes'])
      this.medicationsIncludedByCountry = medicationsIncludedByCountry
    })
  }

  private getLoyaltyPlan() {
    this.loyaltyPlansService.fetch().subscribe( response => {
      this.loyaltyPlan = new LoyaltyPlanModel(response['data']['attributes'])
    });
  }

  private getLoyaltyPlanCountry() {
    this.loyaltyPlanCountryService.fetch(this.loyaltyPlanCountryId).subscribe((response) => {
      this.loyaltyPlanCountry = new LoyaltyPlanCountryModel(response['data']['attributes']);
    })
  }

  private getLoyaltyPlanMedications() {
    this.loyaltyPlanMedicationService.fetchList().subscribe((response) => {
      this.loyaltyPlanMedications = LoyaltyPlanMedicationModel.buildFrom(_.map(response['data'], 'attributes'));
      this.getMedicationsIncludedByCountry()
    })
  }

  private getMedicationsIncludedByCountry() {
    this.medicationsIncludedByCountryService.fetchList(this.loyaltyPlanCountryId).subscribe((response) => {
      this.medicationsIncludedByCountry = MedicationsIncludedByCountryModel.buildFrom(_.map(response['data'], 'attributes'));
      this.buildListOfMedicationsIncludedByCountry()
    })
  }

  private buildListOfMedicationsIncludedByCountry() {
    let medicationsIncludedByCountry = _.cloneDeep(this.medicationsIncludedByCountry)

    _.forEach(this.loyaltyPlanMedications, (loyaltyPlanMedication) => {
      let index = _.findIndex(medicationsIncludedByCountry, { 'loyalty_plan_medication_id': loyaltyPlanMedication.id})

      if (index < 0) {
        let medication = new MedicationsIncludedByCountryModel({
          'medication_name': loyaltyPlanMedication.medication_name,
          'medication_code': loyaltyPlanMedication.medication_code,
          'loyalty_plan_country_id': this.loyaltyPlanCountryId,
          'loyalty_plan_id': this.loyaltyPlan.id,
          'loyalty_plan_medication_id': loyaltyPlanMedication.id,
          'medication_presentation_content': loyaltyPlanMedication.first_medication_presentation.presentation_content,
          'medication_presentation_id': loyaltyPlanMedication.first_medication_presentation.id,
          'status': 'active',
          'isChanged': true,
        })
        medicationsIncludedByCountry.push(medication)
      }
    })
    this.medicationsIncludedByCountry = medicationsIncludedByCountry
  }
}
