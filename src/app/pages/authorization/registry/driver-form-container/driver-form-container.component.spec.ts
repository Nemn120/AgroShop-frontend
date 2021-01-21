import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DriverFormContainerComponent } from './driver-form-container.component';

describe('DriverFormContainerComponent', () => {
  let component: DriverFormContainerComponent;
  let fixture: ComponentFixture<DriverFormContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
