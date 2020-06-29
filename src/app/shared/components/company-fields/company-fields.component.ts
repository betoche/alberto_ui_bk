import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, ControlContainer, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'company-fields',
  templateUrl: './company-fields.component.html',
  styleUrls: ['./company-fields.component.scss']
})
export class CompanyFieldsComponent implements OnInit {
  @Input('form') form: FormGroup;
  @Input('position') position: any = 2;
  @Input('type') type: string;

  public maskForCompanyCode: any = [
    /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/
  ];

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.position = parseInt(this.position);
  }

}
