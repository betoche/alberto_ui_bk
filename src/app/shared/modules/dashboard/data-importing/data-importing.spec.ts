import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { DataImportingComponent } from './data-importing.component';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';

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

  it('enables buttons when file was selected', () => {
    expect(fixture.debugElement.nativeElement.querySelector('#import-btn').disabled).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector('#validation-btn').disabled).toBeTruthy();

    component.file = 'Selected File';
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.querySelector('#import-btn').disabled).toBeFalsy();
    expect(fixture.debugElement.nativeElement.querySelector('#validation-btn').disabled).toBeFalsy();
  });

  it('clicks on validation button', () => {
    component.file = 'Selected File';
    fixture.detectChanges();

    spyOn(component.uploader, 'uploadAll').and.callFake(() => {});
    fixture.debugElement.nativeElement.querySelector('#validation-btn').click();

    expect(component.uploader.uploadAll).toHaveBeenCalled();
  });

  describe('clicks on import button', () => {
    it('does nothing when i click on cancel confirmation', () => {
      initializeComponent({ confirmation: false });
      createComponent();

      component.file = 'Selected File';
      fixture.detectChanges();

      let confirmService = TestBed.get(AppConfirmService);

      spyOn(component.uploader, 'uploadAll').and.callFake(() => {});

      fixture.debugElement.nativeElement.querySelector('#import-btn').click();

      expect(component.uploader.uploadAll).not.toHaveBeenCalled();
    });

    it('does nothing when i click on cancel confirmation', () => {
      initializeComponent({ confirmation: true });
      createComponent();

      component.file = 'Selected File';
      fixture.detectChanges();

      let confirmService = TestBed.get(AppConfirmService);

      spyOn(component.uploader, 'uploadAll').and.callFake(() => {});

      fixture.debugElement.nativeElement.querySelector('#import-btn').click();

      expect(component.uploader.uploadAll).toHaveBeenCalled();
    });
  });

  // // ##########################

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule(
      Object.assign(
        {
          declarations: [DataImportingComponent]
        },
        options
      )
    ).compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(DataImportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
