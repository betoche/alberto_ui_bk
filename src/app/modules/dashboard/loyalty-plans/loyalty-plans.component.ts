import { Component, OnInit } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { DatatableBaseComponent } from 'app/shared/components/datatable.base.component';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

import { LoyaltyPlanModel } from 'app/shared/models/pharmaceutical-company/loyalty-plan.model';
import { LoyaltyPlansService } from 'app/services/loyalty-plan/loyalty-plan.service';
import { DialogService } from 'app/shared/services/dialog.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-loyalty-plans',
  animations: egretAnimations,
  templateUrl: './loyalty-plans.component.html',
  styleUrls: ['./loyalty-plans.component.scss']
})
export class LoyaltyPlansComponent extends DatatableBaseComponent implements OnInit {
  public rows: any = [];

  constructor(
    private loyaltyPlansService: LoyaltyPlansService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.getLoyalPlans();
  }

  public getLoyalPlans() {
    this.loyaltyPlansService.fetchList().subscribe(
      response => {
        this.rows = LoyaltyPlanModel.buildFrom(_.map(response['data'], 'attributes'));
      },
      _error => {
        this.rows = [];
      }
    );
  }

  public deleteItem(row) {
    this.dialogService.deletionConfirm(this, row, {
      message: row.name,
      title: 'DELETE',
      okButton: () => {
        this.loyaltyPlansService.delete(row.id).subscribe();
      }
    });
  }
}
