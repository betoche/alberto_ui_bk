import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashMesssageAutoHideComponent } from './flash-messsage-auto-hide.component';
import { TestBedHelper } from 'spec/test-bed/test-bed-helper';

describe('FlashMesssageAutoHideComponent', () => {
  let component: FlashMesssageAutoHideComponent;
  let fixture: ComponentFixture<FlashMesssageAutoHideComponent>;

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
    fixture = TestBed.createComponent(FlashMesssageAutoHideComponent);
    component = fixture.componentInstance;
    component._options['type'] = 'success'
    component._options['message'] = 'this is success message'
    fixture.detectChanges();
  }
});
