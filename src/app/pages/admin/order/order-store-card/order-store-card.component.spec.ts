import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderStoreCardComponent } from './order-store-card.component';

describe('OrderStoreCardComponent', () => {
  let component: OrderStoreCardComponent;
  let fixture: ComponentFixture<OrderStoreCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStoreCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
