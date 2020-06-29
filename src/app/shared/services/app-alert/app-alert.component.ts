import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `<h1 matDialogTitle class="mb-05">{{ data.title }}</h1>
    <div mat-dialog-content class="mb-1">{{ data.message }}</div>
    <div mat-dialog-actions>
    <span fxFlex></span>
    <button
    type="button"
    color="accent"
    mat-raised-button
    (click)="dialogRef.close(false)">{{ 'OK' | translate }}</button>
    </div>`,
})
export class AppAlertComponent {
  constructor(
    public dialogRef: MatDialogRef<AppAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}
}