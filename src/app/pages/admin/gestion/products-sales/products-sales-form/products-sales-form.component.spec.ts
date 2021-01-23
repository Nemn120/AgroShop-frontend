import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductsSalesFormComponent } from './products-sales-form.component';

describe('ProductsSalesFormComponent', () => {
  let component: ProductsSalesFormComponent;
  let fixture: ComponentFixture<ProductsSalesFormComponent>;

  beforeEach(waitForAsync(() => {
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
