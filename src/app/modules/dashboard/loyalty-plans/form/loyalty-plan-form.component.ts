const Many = require('extends-classes');
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApplicationBaseComponent } from 'app/shared/components/application.base.component';
import { LoyaltyPlanModel } from 'app/shared/models/pharmaceutical-company/loyalty-plan.model';
import { LoyaltyPlansService } from 'app/services/loyalty-plan/loyalty-plan.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { FormControlsHelper } from 'app/shared/helpers/form_controls.helper';

import * as _ from 'lodash';

@Component({
  selector: 'app-loyalty-plan-form',
  templateUrl: './loyalty-plan-form.component.html',
  styleUrls: ['./loyalty-plan-form.component.scss']
})
export class LoyaltyPlanFormComponent extends Many(ApplicationBaseComponent) implements OnInit {
  public form: FormGroup;
  public isNew: boolean;

  constructor(
    private fb: FormBuilder,
    private loader: AppLoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private loyaltyPlansService: LoyaltyPlansService
  ) {
    super();
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    this.isNew = !id;
    this.loyaltyPlan = new LoyaltyPlanModel({});
    this.buildForm(this.loyaltyPlan);

    if (id) {
      this.setLoyaltyPlan(id);
    }

  }

  private setLoyaltyPlan(id: string) {
    this.loyaltyPlansService.fetch(id).subscribe((response) => {
      this.loyaltyPlan = new LoyaltyPlanModel(response['data']['attributes'])
      this.form.patchValue(this.loyaltyPlan)
    });
  }

  public buildForm(item: LoyaltyPlanModel) {
    item = item || this.loyaltyPlan;

    this.form = this.fb.group({
      name: FormControlsHelper.requireFieldOnly(item.name),
      description: FormControlsHelper.requireFieldOnly(item.description),
      logo_url: [item.logo_url],
      website_url: FormControlsHelper.requireFieldOnly(item.website_url),
      exchange_rule: FormControlsHelper.requireFieldOnly(item.exchange_rule),
      regulation_url: FormControlsHelper.requireFieldOnly(item.regulation_url),
      terms_and_conditions_url: FormControlsHelper.requireFieldOnly(item.terms_and_conditions_url),
      rewards_expiration_date: FormControlsHelper.requireFieldOnly(item.rewards_expiration_date)
    })
  }

  public submit() {
    if (this.form.valid) {
      if (this.isNew) {
        this.createNewLoyaltyPlan();
      } else {
        this.updateLoyaltyPlan();
      }
    }
  }

  private updateLoyaltyPlan() {
    this.loader.open();

    let params = this.form.value;

    this.loyaltyPlansService.update(this.loyaltyPlan.id, params).subscribe(
      () => {
        this.loader.close();
        this.showUpdateMessageSuccessful();
        this.router.navigate(['/dashboard/loyalty-plans']);
      },
      (response) => {
        this.errorsMessages = response.error.errors;
        this.loader.close();
      }
    );
  }

  private createNewLoyaltyPlan() {
    this.loader.open();

    let params = this.form.value;

    this.loyaltyPlansService.create(params).subscribe(
      () => {
        this.loader.close();
        this.showUpdateMessageSuccessful();
        this.router.navigate(['/dashboard/loyalty-plans']);
      },
      (response) => {
        this.errorsMessages = response.error.errors;
        this.loader.close();
      }
    );
  }

}
