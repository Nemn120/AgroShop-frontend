import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JobOfferMapComponent } from './job-offer-map.component';

describe('JobOfferMapComponent', () => {
  let component: JobOfferMapComponent;
  let fixture: ComponentFixture<JobOfferMapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JobOfferMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOfferMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
