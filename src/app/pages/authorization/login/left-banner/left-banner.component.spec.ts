import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LeftBannerComponent } from './left-banner.component';

describe('LeftBannerComponent', () => {
  let component: LeftBannerComponent;
  let fixture: ComponentFixture<LeftBannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
