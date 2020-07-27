const Many = require('extends-classes');
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationBaseComponent } from 'app/shared/components/application.base.component';
import { UserModel } from 'app/shared/models/users/user.model';
import { UserEntityModel } from 'app/shared/models/users/user.entity.model';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends ApplicationBaseComponent implements OnInit {
  public form: FormGroup;

  public user: any = new UserModel({});

  constructor() {
    super();
  }

  ngOnInit() {
    this.user = UserEntityModel.getUserInstance(this.currentUser);
    this.checkMessageFromUrlQuery();
  }
}
