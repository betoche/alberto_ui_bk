import { Routes } from '@angular/router';

import { DashboardIndexComponent } from './app-index/app-index.component';
import { EditProfileComponent } from 'app/shared/modules/dashboard/edit-profile/edit-profile.component';

import { DataImportingComponent } from 'app/shared/modules/dashboard/data-importing/data-importing.component';
import { LoyaltyPlanFormComponent } from './loyalty-plans/form/loyalty-plan-form.component';
import { LoyaltyPlanDetailComponent } from './loyalty-plans/detail/loyalty-plan-detail.component';
import { ProfileComponent } from 'app/shared/modules/dashboard/profile/profile.component';
import { TermsAndConditionsComponent } from 'app/shared/features/terms-and-conditions/terms-and-conditions.component';

import {
  MedicationsIncludedByCountryComponent
} from './loyalty-plans/medications-included-by-country/medications-included-by-country.component';

import {
  ParticipatingDrugstoresComponent
} from './loyalty-plans/participating-drugstores/participating-drugstores.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'PROFILE', breadcrumb: 'PROFILE' },
      },
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
        path: 'loyalty-plan',
        data: {
          title: 'LOYALTY_PLAN',
          breadcrumb: 'LOYALTY_PLAN'
        },
        children: [
          {
            path: '',
            component: LoyaltyPlanDetailComponent,
            data: { title: 'DETAIL', breadcrumb: 'DETAIL' }
          },
          {
            path: 'new',
            data: { title: 'ADD', breadcrumb: 'ADD' },
            component: LoyaltyPlanFormComponent
          },
          {
            path: 'edit',
            data: { title: 'MODIFY', breadcrumb: 'MODIFY' },
            component: LoyaltyPlanFormComponent
          }
        ]
      },

      {
        path: 'loyalty-plan-country/:loyalty_plan_country_id/medications-included-by-country',
        data: { title: 'MEDICATIONS_INCLUDED_BY_COUNTRY', breadcrumb: 'MEDICATIONS_INCLUDED_BY_COUNTRY' },
        component: MedicationsIncludedByCountryComponent
      },
      {
        path: 'loyalty-plan-country/:loyalty_plan_country_id/participating-drugstores',
        data: { title: 'PARTICIPATING_DRUGSTORES', breadcrumb: 'PARTICIPATING_DRUGSTORES' },
        component: ParticipatingDrugstoresComponent
      },
      {
        path: 'terms-and-conditions',
        data: {
          title: 'TERMS_AND_CONDITIONS',
          breadcrumb: 'TERMS_AND_CONDITIONS',
        },
        component: TermsAndConditionsComponent
      },
    ]
  }
];
