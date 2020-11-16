import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSalesFormComponent } from './products-sales-form.component';

describe('ProductsSalesFormComponent', () => {
  let component: ProductsSalesFormComponent;
  let fixture: ComponentFixture<ProductsSalesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsSalesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSalesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
