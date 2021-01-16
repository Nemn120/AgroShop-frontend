import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCalendarComponent } from './order-calendar.component';

describe('OrderCalendarComponent', () => {
  let component: OrderCalendarComponent;
  let fixture: ComponentFixture<OrderCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
