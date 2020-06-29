import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { DialogService } from 'app/shared/services/dialog.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'environments/environment';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppAlertService } from 'app/shared/services/app-alert/app-alert.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MatSnackBar } from '@angular/material';
import { UserSession } from 'app/shared/services/user-session';

@Component({
  selector: 'app-data-importing',
  animations: egretAnimations,
  templateUrl: './data-importing.component.html',
  styleUrls: ['./data-importing.component.css']
})
export class DataImportingComponent implements OnInit {
  @ViewChild('uploadEl', { static: false }) uploadElRef;

  public importType: string;
  public file: any;
  public uploader: FileUploader;
  public isValidation: boolean;

  constructor(
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private confirmService: AppConfirmService,
    private alertService: AppAlertService,
    private loader: AppLoaderService,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.importType = this.route.snapshot.params.type;
    this.uploadingConfigurations();
  }

  public importing() {
    this.confirmService
      .confirm({
        message: this.translate.instant('IMPORT_DATA_CONFIRMATION', { type: this.importType })
      })
      .subscribe(response => {
        // cancel button
        if (!response) return false;

        this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
          this.isValidation = false;
          form.append('is_validation', this.isValidation);
        };

        this.loader.open();
        this.uploader.uploadAll();
      });
  }

  public validation() {
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      this.isValidation = true;
      form.append('is_validation', this.isValidation);
    };

    this.loader.open();
    this.uploader.uploadAll();
  }

  private uploadingConfigurations() {
    this.uploader = new FileUploader({
      url: environment.apiURL + '/data_importing/' + this.importType,
      headers: [
        { name: 'Authorization', value: `Token ${UserSession.getToken()}` },
        { name: 'AppRole', value: environment.appRole }
      ]
    });

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
      this.file = file;
    };

    this.uploader.onCompleteItem = (item: any, response: any, _status: any, _headers: any) => {
      response = JSON.parse(response);

      let message = '';
      if (response['statistics']['errors'] > 0) {
        if (this.isValidation) {
          message = this.translate.instant('VALIDATION_FAILED', { number: response['statistics']['errors'] });
        } else {
          message = this.translate.instant('IMPORT_FAILED', { number: response['statistics']['errors'] });
        }

        this.downloadFileFromString('errors', response['errors']);
      } else {
        if (this.isValidation) {
          message = this.translate.instant('VALIDATION_SUCCESSFUL');
        } else {
          message = this.translate.instant('IMPORT_SUCCESSFUL');
        }
      }

      this.alertService.alert({ message: message });

      this.loader.close();
      this.uploadElRef.nativeElement.value = '';
      this.file = null;
    };
  }

  private downloadFileFromString(filename, content) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename + '.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
