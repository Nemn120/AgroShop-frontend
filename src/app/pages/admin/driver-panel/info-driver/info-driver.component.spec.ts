import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfoDriverComponent } from './info-driver.component';

describe('InfoDriverComponent', () => {
  let component: InfoDriverComponent;
  let fixture: ComponentFixture<InfoDriverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
