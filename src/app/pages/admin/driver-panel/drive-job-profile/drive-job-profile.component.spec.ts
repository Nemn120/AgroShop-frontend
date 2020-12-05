import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveJobProfileComponent } from './drive-job-profile.component';

describe('DriveJobProfileComponent', () => {
  let component: DriveJobProfileComponent;
  let fixture: ComponentFixture<DriveJobProfileComponent>;

  beforeEach(async(() => {
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
