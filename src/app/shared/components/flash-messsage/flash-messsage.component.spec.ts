import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashMesssageComponent } from './flash-messsage.component';
import { TestBedHelper } from 'spec/test-bed/test-bed-helper';

describe('FlashMesssageComponent', () => {
  let component: FlashMesssageComponent;
  let fixture: ComponentFixture<FlashMesssageComponent>;

  beforeEach(async(() => {
    initializeComponent()
  }));

  beforeEach(() => {
    createComponent()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show message', () => {
    expect(fixture.debugElement.nativeElement.textContent).toContain('this is success message')
  });

  ////////////////////////////////////////////

  function initializeComponent(options = {}) {
    // re-build component
    TestBed.resetTestingModule();
    TestBedHelper.configureTestingModule().compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(FlashMesssageComponent);
    component = fixture.componentInstance;
    component.type = 'success'
    component.message = 'this is success message'
    fixture.detectChanges();
  }
});
