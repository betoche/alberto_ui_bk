import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadFileComponent } from './upload-file.component';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TestBedHelper } from 'spec/test-bed/test-bed-helper';

describe('UploadFileComponent', () => {
  let component: UploadFileComponent;
  let fixture: ComponentFixture<UploadFileComponent>;

  beforeEach(async(() => {
    initializeComponent();
  }));

  beforeEach(() => {
    createComponent();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have an input file', () => {
    let inputEl = fixture.debugElement.query(By.css('.input-file'));
    expect(inputEl).toBeTruthy();
  });

  // ##########################

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule(Object.assign({}, options)).compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(UploadFileComponent);
    component = fixture.componentInstance;

    component.control = new FormControl('', [])

    fixture.detectChanges();
  }
});
