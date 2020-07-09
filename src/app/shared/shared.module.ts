import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// SERVICES
import { ThemeService } from './services/theme.service';
import { NavigationService } from "app/services/navigation.service";
import { RoutePartsService } from './services/route-parts.service';
import { AuthGuard } from './services/auth/auth.guard';
import { AppConfirmService } from './services/app-confirm/app-confirm.service';
import { AppAlertService } from './services/app-alert/app-alert.service';
import { AppLoaderService } from './services/app-loader/app-loader.service';

import { SharedComponentsModule } from './components/shared-components.module';
import { SharedPipesModule } from './pipes/shared-pipes.module';
import { SharedDirectivesModule } from './directives/shared-directives.module';
import { SharedFeaturesModule } from './features/shared-features.module';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule,
    SharedFeaturesModule,
    TreeViewModule
  ],
  providers: [
    ThemeService,
    NavigationService,
    RoutePartsService,
    AuthGuard,
    AppConfirmService,
    AppAlertService,
    AppLoaderService
  ],
  exports: [
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule,
    SharedFeaturesModule,
    TreeViewModule
  ]
})
export class SharedModule { }
