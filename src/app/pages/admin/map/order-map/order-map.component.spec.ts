import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMapComponent } from './order-map.component';

describe('OrderMapComponent', () => {
  let component: OrderMapComponent;
  let fixture: ComponentFixture<OrderMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
