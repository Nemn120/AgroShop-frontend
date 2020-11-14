import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesViewComponent } from './categories-view.component';

describe('CategoriesViewComponent', () => {
  let component: CategoriesViewComponent;
  let fixture: ComponentFixture<CategoriesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
