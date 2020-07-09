import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

import { AppComfirmComponent } from './app-confirm.component';

interface confirmData {
  title?: string;
  message?: string;
  okText?: string;
}

@Injectable()
export class AppConfirmService {
  constructor(private dialog: MatDialog) {}

  public confirm(data: confirmData = {}, options: object = {}): Observable<boolean> {
    data.title = data.title || 'Confirmación';
    data.message = data.message || '¿Estás seguro?';
    let dialogRef: MatDialogRef<AppComfirmComponent>;
    dialogRef = this.dialog.open(AppComfirmComponent, {
      width: options['width'] || '380px',
      disableClose: true,
      data: { title: data.title, message: data.message, okText: data.okText || 'OK' }
    });
    return dialogRef.afterClosed();
  }
}
