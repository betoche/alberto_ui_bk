import { Component, OnInit, forwardRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ControlValueAccessor,
  Validator,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { FormCollectionHelper } from 'app/helpers/form_collection.helper';

@Component({
  selector: 'app-drugstore-form',
  templateUrl: './drugstore-form.component.html',
  styleUrls: ['./drugstore-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DrugstoreFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DrugstoreFormComponent),
      multi: true,
    },
  ],
})
export class DrugstoreFormComponent implements OnInit, ControlValueAccessor, Validator {
  public drugstoreForm: FormGroup;
  public countryList: any = [];
  public formCollectionHelper = FormCollectionHelper;

  ngOnInit() {
    this.countryList = [];
    this.buildForm({});
  }

  public buildForm(item: any) {
    this.drugstoreForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      drugstore_id: new FormControl('', [Validators.required]),
    });
  }

  public onTouched: () => void = () => {};

  writeValue(obj: any): void {
    obj && this.drugstoreForm.patchValue(obj);
  }

  registerOnChange(fn: any): void {
    this.drugstoreForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.drugstoreForm.valid
      ? null
      : { invalidForm: { valid: false, message: 'drugstoreForm fields are invalid' } };
  }
}
