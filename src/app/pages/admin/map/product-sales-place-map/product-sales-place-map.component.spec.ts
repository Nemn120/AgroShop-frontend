import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductSalesPlaceMapComponent } from './product-sales-place-map.component';

describe('ProductSalesPlaceMapComponent', () => {
  let component: ProductSalesPlaceMapComponent;
  let fixture: ComponentFixture<ProductSalesPlaceMapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSalesPlaceMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSalesPlaceMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
