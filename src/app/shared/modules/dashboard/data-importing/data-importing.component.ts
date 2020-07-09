import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
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
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-data-importing',
  animations: egretAnimations,
  templateUrl: './data-importing.component.html',
  styleUrls: ['./data-importing.component.scss']
})
export class DataImportingComponent implements OnInit {
  @ViewChild('uploadEl', { static: false }) uploadElRef;
  @Input('importType') importType: string;

  public file: any;
  public uploader: FileUploader;
  public isValidation: boolean;
  public fileName: string;
  public messageOptions: any = {};

  // undefined -> validation process is not run
  // false -> validation does not passed
  // true -> validation passed, ready to importing
  public isValidFileData: boolean = undefined;

  constructor(
    private dialogRef: MatDialogRef<any>,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private confirmService: AppConfirmService,
    private alertService: AppAlertService,
    private loader: AppLoaderService,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.uploadingConfigurations();
  }

  public importing() {
    if(!this.isValidFileData){ return false }

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      this.isValidation = false;
      form.append('is_validation', this.isValidation);
    };

    this.loader.open();

    this.file.upload();
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
      this.fileName = file.file.name;
      this.messageOptions = {};
      this.isValidFileData = undefined;
    };

    this.uploader.onCompleteItem = (item: any, response: any, _status: any, _headers: any) => {
      response = JSON.parse(response);

      let message = '';
      if (response['statistics']['errors'] > 0) {
        this.isValidFileData = false;
        this.downloadFileFromString('errors', response['errors']);
        if (this.isValidation) {
          this.showMessageValidationFailed();
        }
      } else {
        if (this.isValidation) {
          this.isValidFileData = true;
          this.showMessageValidationOK();
        } else {
          this.dialogRef.close(true);
        }
      }

      this.loader.close();
      this.uploadElRef.nativeElement.value = '';
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

  private showMessageValidationOK(){
    this.messageOptions = {
      type: 'success',
      message: 'NO_ERROR_FOUND'
    }
  }

  private showMessageValidationFailed(){
    this.messageOptions = {
      type: 'danger',
      message: 'VALIDATION_FAILED'
    }
  }

}
