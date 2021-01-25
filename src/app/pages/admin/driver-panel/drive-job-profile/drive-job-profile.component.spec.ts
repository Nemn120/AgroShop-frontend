import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DriveJobProfileComponent } from './drive-job-profile.component';

describe('DriveJobProfileComponent', () => {
  let component: DriveJobProfileComponent;
  let fixture: ComponentFixture<DriveJobProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DriveJobProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveJobProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
