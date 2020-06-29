import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';

export let injectorsGlobal: any;

@Injectable()
export class InjectorsHelper {
  constructor(private translate: TranslateService, private snack: MatSnackBar, private dialog: MatDialog) {
    injectorsGlobal = {
      translate: this.translate,
      snack: this.snack,
      dialog: this.dialog
    };
  }
}
