import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSalesPlaceMapComponent } from './product-sales-place-map.component';

describe('ProductSalesPlaceMapComponent', () => {
  let component: ProductSalesPlaceMapComponent;
  let fixture: ComponentFixture<ProductSalesPlaceMapComponent>;

  beforeEach(async(() => {
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
