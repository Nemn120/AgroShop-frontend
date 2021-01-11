import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSalesMapComponent } from './product-sales-map.component';

describe('ProductSalesMapComponent', () => {
  let component: ProductSalesMapComponent;
  let fixture: ComponentFixture<ProductSalesMapComponent>;

  beforeEach(async(() => {
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
