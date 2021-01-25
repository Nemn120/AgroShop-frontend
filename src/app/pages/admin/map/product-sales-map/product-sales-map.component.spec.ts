import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductSalesMapComponent } from './product-sales-map.component';

describe('ProductSalesMapComponent', () => {
  let component: ProductSalesMapComponent;
  let fixture: ComponentFixture<ProductSalesMapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSalesMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSalesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
