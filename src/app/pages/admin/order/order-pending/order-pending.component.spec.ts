import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPendingComponent } from './order-pending.component';

describe('OrderPendingComponent', () => {
  let component: OrderPendingComponent;
  let fixture: ComponentFixture<OrderPendingComponent>;

  beforeEach(async(() => {
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
