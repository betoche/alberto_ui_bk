import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../shared-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
import { FileUploadModule } from 'ng2-file-upload';

// ONLY REQUIRED FOR **SIDE** NAVIGATION LAYOUT
import { HeaderSideComponent } from './header-side/header-side.component';
import { SidebarSideComponent } from './sidebar-side/sidebar-side.component';

// ONLY REQUIRED FOR **TOP** NAVIGATION LAYOUT
import { HeaderTopComponent } from './header-top/header-top.component';
import { SidebarTopComponent } from './sidebar-top/sidebar-top.component';

// ALWAYS REQUIRED
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AppComfirmComponent } from '../services/app-confirm/app-confirm.component';
import { AppAlertComponent } from '../services/app-alert/app-alert.component';
import { AppLoaderComponent } from '../services/app-loader/app-loader.component';
import { ButtonLoadingComponent } from './button-loading/button-loading.component';
import { EgretSidebarComponent, EgretSidebarTogglerDirective } from './egret-sidebar/egret-sidebar.component';
import { BottomSheetShareComponent } from './bottom-sheet-share/bottom-sheet-share.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { QrCodeScannerForBrowserComponent } from './qr-code-scanner-for-browser/qr-code-scanner-for-browser';
import { FlashMesssageComponent } from './flash-messsage/flash-messsage.component';
import { FlashMesssageAutoHideComponent } from './flash-messsage-auto-hide/flash-messsage-auto-hide.component';
import { PasswordInputComponent } from './password-input/password-input.component';
import { PhoneNumberWithCountryFlagComponent } from './phone-number-with-country-flag/phone-number-with-country-flag.component';
import { InputDisabledWithIconComponent } from './input-disabled-with-icon/input-disabled-with-icon.component';
import { CountryComponent } from './locations/country/country.component';
import { AddressFieldsComponent } from './address-fields/address-fields.component';
import { ProvinceComponent } from './locations/province/province.component';
import { CantonComponent } from './locations/canton/canton.component';
import { DistrictComponent } from './locations/district/district.component';
import { SuburbComponent } from './locations/suburb/suburb.component';
import { SecurePasswordInputComponent } from './secure-password-input/secure-password-input.component';
import { DrugstoreFormComponent } from './drugstore-form/drugstore-form.component';
import { UserInfoFieldsComponent } from './user-info-fields/user-info-fields.component';
import { CompanyFieldsComponent } from './company-fields/company-fields.component';
import { BillingInformationFieldsComponent } from './billing-information-fields/billing-information-fields.component';
import { GovernmentIdTypesComponent } from './government-id-types/government-id-types.component';
import { DatatablePageLimitComponent } from './datatable-page-limit/datatable-page-limit.component';
import { DataImportingComponent } from 'app/shared/modules/dashboard/data-importing/data-importing.component';
import { ProfileComponent } from 'app/shared/modules/dashboard/profile/profile.component';

import { TextMaskModule } from 'angular2-text-mask';

const components = [
  HeaderTopComponent,
  SidebarTopComponent,
  SidenavComponent,
  NotificationsComponent,
  SidebarSideComponent,
  HeaderSideComponent,
  AdminLayoutComponent,
  AuthLayoutComponent,
  BreadcrumbComponent,
  AppComfirmComponent,
  AppAlertComponent,
  AppLoaderComponent,
  ButtonLoadingComponent,
  EgretSidebarComponent,
  FooterComponent,
  EgretSidebarTogglerDirective,
  BottomSheetShareComponent,
  UploadFileComponent,
  QrCodeScannerForBrowserComponent,
  FlashMesssageComponent,
  FlashMesssageAutoHideComponent,
  PasswordInputComponent,
  PhoneNumberWithCountryFlagComponent,
  InputDisabledWithIconComponent,
  CountryComponent,
  AddressFieldsComponent,
  ProvinceComponent,
  CantonComponent,
  SuburbComponent,
  DistrictComponent,
  GovernmentIdTypesComponent,
  DatatablePageLimitComponent,
  SecurePasswordInputComponent,
  DrugstoreFormComponent,
  UserInfoFieldsComponent,
  CompanyFieldsComponent,
  BillingInformationFieldsComponent,
  DataImportingComponent,
  ProfileComponent
];

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    SharedPipesModule,
    SharedDirectivesModule,
    SharedMaterialModule,
    TextMaskModule
  ],
  declarations: components,
  entryComponents: [AppComfirmComponent, AppLoaderComponent, BottomSheetShareComponent, AppAlertComponent],
  exports: components,
})
export class SharedComponentsModule {}
