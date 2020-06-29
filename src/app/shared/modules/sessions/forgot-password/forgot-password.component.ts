import { Component, OnInit, ViewChild } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';

import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: egretAnimations
})
export class ForgotPasswordComponent implements OnInit {
  public form: FormGroup;
  public responseErrorMessage: string;
  public infoMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private userService: UserService,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      this.responseErrorMessage = '';
      this.infoMessage = '';

      this.userService.forgotPassword(this.form.value.email).subscribe(
        response => {
          this.infoMessage = response['message'];
        },
        response => {
          this.responseErrorMessage = response['error']['message'];
        }
      );
    }
  }
}
