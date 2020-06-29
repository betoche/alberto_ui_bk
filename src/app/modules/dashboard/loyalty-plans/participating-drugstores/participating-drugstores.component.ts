const Many = require('extends-classes');
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { egretAnimations } from 'app/shared/animations/egret-animations';

import { DatatableBaseComponent } from 'app/shared/components/datatable.base.component';
import { ApplicationBaseComponent } from 'app/shared/components/application.base.component';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

import { LoyaltyPlanCountryService } from 'app/services/loyalty-plan-country/loyalty-plan-country.service';
import { LoyaltyPlansService } from 'app/services/loyalty-plan/loyalty-plan.service';
import { DrugstoreSharedService } from 'app/shared/services/drugstore/drugstore.shared.service';
import { ParticipatingDrugstoresService } from 'app/services/participating_drugstores.service';

import { LoyaltyPlanModel } from 'app/shared/models/pharmaceutical-company/loyalty-plan.model';
import { LoyaltyPlanCountryModel } from 'app/shared/models/loyalty-plan-country/loyalty-plan-country.model';
import { DrugstoreModel } from 'app/shared/models/pharmaceutical-company/drugstore.model';
import { LoyaltyPlanParticipatingDrugstoreModel } from 'app/shared/models/pharmaceutical-company/loyalty-plan-participating-drugstore.model';
import { DrugstoreLocationModel } from 'app/shared/models/pharmaceutical-company/drugstore-location.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-participating-drugstores',
  animations: egretAnimations,
  templateUrl: './participating-drugstores.component.html',
  styleUrls: ['./participating-drugstores.component.scss']
})
export class ParticipatingDrugstoresComponent extends Many(
  ApplicationBaseComponent, DatatableBaseComponent) implements OnInit {

  public loyaltyPlan: any={};
  public loyaltyPlanCountry: any={};
  public loyaltyPlanCountryId: string;
  public loyaltyPlanId: string;
  public isAddingParticipatingDrugstore: boolean=false;
  public participatingDrugstores: any=[];
  public drugstores: any=[];
  public selectedDrugstore: any={};
  public drugstoreLocations: any=[];
  public selectedParticipatingDrugstores: any=[];

  constructor(
    private loader: AppLoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private loyaltyPlanCountryService: LoyaltyPlanCountryService,
    private loyaltyPlansService: LoyaltyPlansService,
    private drugstoreSharedService: DrugstoreSharedService,
    private participatingDrugstoresService: ParticipatingDrugstoresService,
  ) {
    super();
  }

  ngOnInit() {
    this.loyaltyPlanId = this.route.snapshot.params.loyalty_plan_id;
    this.loyaltyPlanCountryId = this.route.snapshot.params.loyalty_plan_country_id;

    this.getLoyaltyPlanCountry();
    this.getLoyaltyPlan();
    this.getDrugstores();
    this.getParticipatingDrugstores();
  }

  public addParticipatingDrugstore() {
    this.isAddingParticipatingDrugstore = true
  }

  public backToList() {
    this.selectedParticipatingDrugstores = []
    this.isAddingParticipatingDrugstore = false
    this.getParticipatingDrugstores()
  }

  public onChangeDrugstore($event) {
    this.selectedDrugstore = $event.value

    let participatingDrugstores = []
    this.selectedDrugstore.drugstore_locations.forEach(drugstoreLocation => {
      let participatingDrugstore = _.find(this.selectedParticipatingDrugstores, {
        drugstore_location_id: drugstoreLocation.id
      });

      if (!participatingDrugstore) {
        participatingDrugstore = new LoyaltyPlanParticipatingDrugstoreModel({
          drugstore_name: drugstoreLocation.attributes.drugstore_name,
          full_address: drugstoreLocation.attributes.full_address,
          drugstore_location_id: drugstoreLocation.id,
        })

        participatingDrugstores.push(participatingDrugstore)
      }
    })

    this.participatingDrugstores = participatingDrugstores
  }

  public selectAllParticipatingDrugstores() {
    this.participatingDrugstores.forEach(participatingDrugstore => {
      this.selectedParticipatingDrugstores = _.concat(this.selectedParticipatingDrugstores, participatingDrugstore)
    })
    this.participatingDrugstores = []
  }

  public addToParticipatingDrugstores(participatingDrugstore) {
    this.selectedParticipatingDrugstores = _.concat(this.selectedParticipatingDrugstores, participatingDrugstore)

    _.remove(this.participatingDrugstores, (item) => {
      return item.drugstore_location_id === participatingDrugstore.drugstore_location_id
    });
  }

  public removeToParticipatingDrugstores(participatingDrugstore) {
    this.participatingDrugstores = _.concat(this.participatingDrugstores, participatingDrugstore)

    _.remove(this.selectedParticipatingDrugstores, (item) => {
      return item.drugstore_location_id === participatingDrugstore.drugstore_location_id
    });
  }

  public saveListOfParticipatingDrugstores() {
    this.participatingDrugstoresService.createList(
      this.loyaltyPlanCountryId, this.selectedParticipatingDrugstores
    ).subscribe(response => {
      this.isAddingParticipatingDrugstore = false
      this.selectedParticipatingDrugstores = LoyaltyPlanParticipatingDrugstoreModel.buildFrom(
        _.map(response['data'], 'attributes')
      );
    })
  }

  public updateStatus(id, status, rowIndex) {
    let selectedParticipatingDrugstores = _.cloneDeep(this.selectedParticipatingDrugstores)
    this.participatingDrugstoresService.update(
      this.loyaltyPlanCountryId, id, { status: status }
    ).subscribe(response => {
      let participatingDrugstore = new LoyaltyPlanParticipatingDrugstoreModel(response['data']['attributes'])
      selectedParticipatingDrugstores[rowIndex] = participatingDrugstore
      this.selectedParticipatingDrugstores = selectedParticipatingDrugstores
    })
  }

  private getLoyaltyPlanCountry() {
    this.loyaltyPlanCountryService.fetch(this.loyaltyPlanId, this.loyaltyPlanCountryId).subscribe((response) => {
      this.loyaltyPlanCountry = new LoyaltyPlanCountryModel(response['data']['attributes']);
    })
  }

  private getLoyaltyPlan() {
    this.loyaltyPlansService.fetch(this.loyaltyPlanId).subscribe( response => {
      this.loyaltyPlan = new LoyaltyPlanModel(response['data']['attributes'])
    });
  }

  private getDrugstores() {
    this.drugstoreSharedService.fetchList().subscribe( response => {
      this.drugstores = DrugstoreModel.buildFrom(_.map(response['data'], 'attributes'));
    });
  }

  private getParticipatingDrugstores() {
    this.participatingDrugstoresService.fetchList(this.loyaltyPlanCountryId).subscribe(response => {
      this.selectedParticipatingDrugstores = LoyaltyPlanParticipatingDrugstoreModel.buildFrom(
        _.map(response['data'], 'attributes')
      );
    })
  }
}
