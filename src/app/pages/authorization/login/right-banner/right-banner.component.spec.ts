import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RightBannerComponent } from './right-banner.component';

describe('RightBannerComponent', () => {
  let component: RightBannerComponent;
  let fixture: ComponentFixture<RightBannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RightBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
