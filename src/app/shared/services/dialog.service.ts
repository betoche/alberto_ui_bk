import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Injectable()
export class DialogService {
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private translateService: TranslateService
  ) {}

  public openPopUp(object: any, component: any, options = {}) {
    let data = options['data'] || {};
    let dialogRef: MatDialogRef<any> = this.dialog.open(component, {
      width: options['width'] || '720px',
      disableClose: options['disableClose'] || true,
      data: data
    });

    dialogRef.afterClosed().subscribe(response => {
      // cancel button
      if (!response) {
        return false;
      }

      let rowData = response;
      if (options['handleResponse']) {
        rowData = options['handleResponse'](response);
      }

      if (data['isNew']) {
        // do action after added new row
      } else {
        if(options['modelClass']){
          rowData = new options['modelClass'](rowData);
        }
        object['updateRow'](rowData);
      }
    });
  }

  public deletionConfirm(object, row, options = {}) {
    this.confirmService
      .confirm(
        {
          title: this.translateService.instant(options['title'] || 'DELETE_CONFIRM'),
          message: options['message'] || this.translateService.instant(
            'DELETE_CONFIRM', { name: options['name'] }
          )
        },
        options
      )
      .subscribe(response => {
        // cancel button
        if (!response) return false;

        this.loader.open();
        options['okButton']();
        object['removeRow'](row);
        this.loader.close();
      });
  }

  public suspensionConfirm(options = {}) {
    this.confirmService
      .confirm(
        {
          title: this.translateService.instant(options['title'] || 'SUSPEND_CONFIRM'),
          message: options['message'],
          okText: "YES_SUSPEND"
        },
        options
      )
      .subscribe(response => {
        // cancel button
        if (!response) return false;

        this.loader.open();
        options['okButton']();
        this.loader.close();
      });
  }
}
