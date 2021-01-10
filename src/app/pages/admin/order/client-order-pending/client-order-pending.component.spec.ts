import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOrderPendingComponent } from './client-order-pending.component';

describe('ClientOrderPendingComponent', () => {
  let component: ClientOrderPendingComponent;
  let fixture: ComponentFixture<ClientOrderPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientOrderPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientOrderPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
