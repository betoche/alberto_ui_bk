import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

import { AppAlertComponent } from './app-alert.component';

interface alertData {
  title?: string,
  message?: string
}

@Injectable()
export class AppAlertService {

  constructor(private dialog: MatDialog) { }

  public alert(data:alertData = {}): Observable<boolean> {
    data.title = data.title || "Información";
    data.message = data.message;
    let dialogRef: MatDialogRef<AppAlertComponent>;
    dialogRef = this.dialog.open(AppAlertComponent, {
      width: '380px',
      disableClose: true,
      data: {title: data.title, message: data.message}
    });
    return dialogRef.afterClosed();
  }
}