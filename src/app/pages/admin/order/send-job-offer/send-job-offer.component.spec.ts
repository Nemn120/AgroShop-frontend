import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SendJobOfferComponent } from './send-job-offer.component';

describe('SendJobOfferComponent', () => {
  let component: SendJobOfferComponent;
  let fixture: ComponentFixture<SendJobOfferComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SendJobOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendJobOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
