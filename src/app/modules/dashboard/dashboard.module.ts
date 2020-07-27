import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatChipsModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTabsModule,
  MatSelectModule,
  MatInputModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { SharedModule } from './../../shared/shared.module';
import { DashboardRoutes } from './dashboard.routing';
import { TranslateModule } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';

import { DashboardIndexComponent } from './app-index/app-index.component';
import { EditProfileComponent } from 'app/shared/modules/dashboard/edit-profile/edit-profile.component';

import { DialogService } from 'app/shared/services/dialog.service';
import { LoyaltyPlanFormComponent } from './loyalty-plans/form/loyalty-plan-form.component';
import { LoyaltyPlanDetailComponent } from './loyalty-plans/detail/loyalty-plan-detail.component';
import { MedicationsIncludedByCountryComponent } from './loyalty-plans/medications-included-by-country/medications-included-by-country.component';
import { ParticipatingDrugstoresComponent } from './loyalty-plans/participating-drugstores/participating-drugstores.component';
import { ProfileComponent } from './../../shared/modules/dashboard/profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    MatProgressBarModule,
    FlexLayoutModule,
    NgxDatatableModule,
    ChartsModule,
    FileUploadModule,
    SharedModule,
    TranslateModule,
    MatDatepickerModule,
    RouterModule.forChild(DashboardRoutes),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyC2q98PSobmuY7FJI5AowXOSTSGNyuDjzU' })
  ],
  declarations: [
    DashboardIndexComponent,
    EditProfileComponent,
    ProfileComponent,
    LoyaltyPlanFormComponent,
    LoyaltyPlanDetailComponent,
    MedicationsIncludedByCountryComponent,
    ParticipatingDrugstoresComponent
  ],
  entryComponents: [],
  exports: [ReactiveFormsModule],
  providers: [
    DialogService,
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'DD/MM/YYYY',
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ]
})
export class DashboardModule {}
