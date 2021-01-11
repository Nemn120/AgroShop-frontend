import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductsSalesMapComponent } from './view-products-sales-map.component';

describe('ViewProductsSalesMapComponent', () => {
  let component: ViewProductsSalesMapComponent;
  let fixture: ComponentFixture<ViewProductsSalesMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProductsSalesMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductsSalesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
