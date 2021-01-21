import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoriesFormComponent } from './categories-form.component';

describe('CategoriesFormComponent', () => {
  let component: CategoriesFormComponent;
  let fixture: ComponentFixture<CategoriesFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
