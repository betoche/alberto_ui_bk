import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, ControlContainer } from '@angular/forms';

@Component({
  selector: 'input-disabled-with-icon',
  templateUrl: './input-disabled-with-icon.component.html',
  styleUrls: ['./input-disabled-with-icon.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    }
  ]
})
export class InputDisabledWithIconComponent implements OnInit {
  @Input('controlName') controlName: string;
  @Input('form') form: FormGroup;
  @Input('placeholder') placeholder: string;
  @Input('textMask') textMask: any = [];

  constructor(public parent: FormGroupDirective) {}

  ngOnInit() {
    this.form = this.form || this.parent.form;
  }
}
