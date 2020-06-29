import { Routes } from '@angular/router';

import { DashboardIndexComponent } from './app-index/app-index.component';
import { EditProfileComponent } from './../../shared/modules/dashboard/edit-profile/edit-profile.component';

import { DataImportingComponent } from 'app/shared/modules/dashboard/data-importing/data-importing.component';
import { LoyaltyPlansComponent } from './loyalty-plans/loyalty-plans.component';
import { LoyaltyPlanFormComponent } from './loyalty-plans/form/loyalty-plan-form.component';
import { LoyaltyPlanDetailComponent } from './loyalty-plans/detail/loyalty-plan-detail.component';
import { MedicationsIncludedByCountryComponent } from './loyalty-plans/medications-included-by-country/medications-included-by-country.component';
import { ParticipatingDrugstoresComponent } from './loyalty-plans/participating-drugstores/participating-drugstores.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'edit_profile',
        component: EditProfileComponent,
        data: { title: 'EDIT_PROFILE', breadcrumb: 'EDIT_PROFILE' }
      },
      {
        path: 'data-importing/:type',
        component: DataImportingComponent,
        data: { title: 'IMPORT_DATA', breadcrumb: 'IMPORT_DATA' }
      },
      {
        path: '/',
        component: DashboardIndexComponent,
        data: { title: 'Blank', breadcrumb: 'BLANK' }
      },

      {
        path: 'loyalty-plans',
        data: {
          title: 'LOYALTY_PLANS',
          breadcrumb: 'LOYALTY_PLANS'
        },
        children: [
          {
            path: '',
            component: LoyaltyPlansComponent
          },
          {
            path: 'new',
            data: { title: 'ADD', breadcrumb: 'ADD' },
            component: LoyaltyPlanFormComponent
          },
          {
            path: ':id/edit',
            data: { title: 'MODIFY', breadcrumb: 'MODIFY' },
            component: LoyaltyPlanFormComponent
          },
          {
            path: ':id',
            data: { title: 'DETAIL', breadcrumb: 'DETAIL' },
            component: LoyaltyPlanDetailComponent
          },
          {
            path: ':loyalty_plan_id/loyalty-plan-country/:loyalty_plan_country_id/medications-included-by-country',
            data: { title: 'MEDICATIONS_INCLUDED_BY_COUNTRY', breadcrumb: 'MEDICATIONS_INCLUDED_BY_COUNTRY' },
            component: MedicationsIncludedByCountryComponent
          },
          {
            path: ':loyalty_plan_id/loyalty-plan-country/:loyalty_plan_country_id/participating-drugstores',
            data: { title: 'PARTICIPATING_DRUGSTORES', breadcrumb: 'PARTICIPATING_DRUGSTORES' },
            component: ParticipatingDrugstoresComponent
          }
        ]
      }

    ]
  }
];
