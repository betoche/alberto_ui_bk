import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements OnInit {
  @Input('name') name: any;
  @Input('placeholder') placeholder: string = '';
  @Input('objectField') objectField: any = {};

  public hide = true;
  public parentForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.parentForm = this.objectField.parent;
  }
}
