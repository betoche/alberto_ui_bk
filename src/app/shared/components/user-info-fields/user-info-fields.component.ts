import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, ControlContainer, FormBuilder, Validators } from '@angular/forms';
import { FormCollectionHelper } from 'app/helpers/form_collection.helper';

@Component({
  selector: 'app-user-info-fields',
  templateUrl: './user-info-fields.component.html',
  styleUrls: ['./user-info-fields.component.scss']
})
export class UserInfoFieldsComponent implements OnInit {
  @Input('form') form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
  }

}
