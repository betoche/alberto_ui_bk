import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { DataImportingComponent } from './data-importing.component';
import * as $ from 'jquery';

class FileItem {
  public upload(){}
}

describe('DataImportingComponent', () => {
  let component: DataImportingComponent;
  let fixture: ComponentFixture<DataImportingComponent>;

  beforeEach(async(() => {
    initializeComponent();
  }));

  beforeEach(() => {
    createComponent();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('validates the file data', () => {
    expect($('#import-btn').length).toEqual(0);
    expect($('#validation-btn').attr('disabled')).toBeTruthy();

    component.file = new FileItem();
    fixture.detectChanges();

    expect($('#import-btn').length).toEqual(0);
    expect($('#validation-btn').attr('disabled')).toBeFalsy();

    spyOn(component.uploader, 'uploadAll').and.callFake(() => {});
    $('#validation-btn').click();

    expect(component.uploader.uploadAll).toHaveBeenCalled();
  });

  it('imports the file data', () => {
    expect($('#import-btn').length).toEqual(0);
    expect($('#validation-btn').attr('disabled')).toBeTruthy();

    component.file = new FileItem();
    component.isValidFileData = true;
    fixture.detectChanges();

    expect($('#import-btn').length).toEqual(1);
    expect($('#import-btn').attr('disabled')).toBeFalsy();
    expect($('#validation-btn').length).toEqual(0);

    spyOn(component.file, 'upload').and.callFake(() => {});
    $('#import-btn').click();

    expect(component.file.upload).toHaveBeenCalled();
  });

  // // ##########################

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule().compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(DataImportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
