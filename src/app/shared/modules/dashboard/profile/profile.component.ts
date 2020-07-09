const Many = require('extends-classes');
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationBaseComponent } from 'app/shared/components/application.base.component';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends ApplicationBaseComponent implements OnInit {
  public form: FormGroup;

  constructor() {
    super();
  }

  ngOnInit() {
  }
}
