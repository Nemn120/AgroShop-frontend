import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderPendingComponent } from './order-pending.component';

describe('OrderPendingComponent', () => {
  let component: OrderPendingComponent;
  let fixture: ComponentFixture<OrderPendingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
