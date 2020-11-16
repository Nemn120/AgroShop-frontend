import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSalesViewComponent } from './products-sales-view.component';

describe('ProductsSalesViewComponent', () => {
  let component: ProductsSalesViewComponent;
  let fixture: ComponentFixture<ProductsSalesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsSalesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSalesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
