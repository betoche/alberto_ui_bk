import { Router, ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroupDirective, ControlContainer } from '@angular/forms';
import { convertToParamMap} from '@angular/router';
import { RouterModule } from "@angular/router";

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpHandler } from '@angular/common/http';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
  TranslateService,
  TranslatePipe
} from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppAlertService } from 'app/shared/services/app-alert/app-alert.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DialogService } from 'app/shared/services/dialog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MatDialog, MatDialogRef } from '@angular/material';
import { InjectorsHelper, injectorsGlobal } from 'app/shared/services/injectors_global.service';

import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

import { SharedModule } from 'app/shared/shared.module';

import { rootRouterConfig } from 'app/app.routing';

export const TestBedHelper = {
  configureTestingModule: function(options = {}) {
    // mock class MatDialog from options
    class MatDialogMock {
      open(option?) {
        return { afterClosed: () => of(options['dialog_close_data']) };
      }
      close() {}
    }

    const MatDialogRefMock = {
      close: jasmine.createSpy('close')
    };

    // mock class AppConfirmService from options
    class AppConfirmServiceMock {
      confirm() {
        return of(options['confirmation']);
      }
    }

    // mock class AppAlertService from options
    class AppAlertServiceMock {
      confirm() {
        return of(options['alert']);
      }
    }

    // mock class AppLoaderService from options
    class AppLoaderServiceMock {
      open() {}
      close() {}
    }

    // ###################################

    let optionsDefault = {
      // ##############
      imports: [
        RouterTestingModule.withRoutes([]),
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedMaterialModule,
        FlexLayoutModule,
        PerfectScrollbarModule,
        FileUploadModule,
        NgxDatatableModule,
        HttpClientTestingModule,
        NgxSpinnerModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ].concat(options['imports'] || []),

      // ##############
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: MatDialogRef, useValue: MatDialogRefMock },
        { provide: AppConfirmService, useClass: AppConfirmServiceMock },
        { provide: AppAlertService, useClass: AppAlertServiceMock },
        { provide: AppLoaderService, useClass: AppLoaderServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: options['route_params'] || {},
              queryParams: options['query_params'] || {}
            },
            params: of(options['route_params'] || {})
          }
        },
        InjectorsHelper,
        HttpClientTestingModule,
        DialogService,
        FormGroupDirective,
      ].concat(options['providers'] || []),

      // ##############
      declarations: [].concat(options['declarations'] || []),

      // ##############
      entryComponents: [].concat(options['entryComponents'] || []),

      // ##############
      exports: [ReactiveFormsModule].concat(options['entryComponents'] || [])
    };

    let testModule = TestBed.configureTestingModule(optionsDefault);

    TestBed.get(InjectorsHelper);

    return testModule;
  }
};
