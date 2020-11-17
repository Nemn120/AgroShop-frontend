import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSalesListComponent } from './products-sales-list.component';

describe('ProductsSalesListComponent', () => {
  let component: ProductsSalesListComponent;
  let fixture: ComponentFixture<ProductsSalesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsSalesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSalesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
