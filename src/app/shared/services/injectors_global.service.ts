import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

export let injectorsGlobal: any;

@Injectable()
export class InjectorsHelper {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private snack: MatSnackBar,
    private dialog: MatDialog) {

    injectorsGlobal = {
      translate: this.translate,
      snack: this.snack,
      dialog: this.dialog,
      route: this.route,
      router: this.router
    };
  }
}
