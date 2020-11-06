import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFormContainerComponent } from './customer-form-container.component';

describe('CustomerFormContainerComponent', () => {
  let component: CustomerFormContainerComponent;
  let fixture: ComponentFixture<CustomerFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
