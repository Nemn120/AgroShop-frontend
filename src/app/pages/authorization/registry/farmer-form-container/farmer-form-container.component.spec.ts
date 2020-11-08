import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerFormContainerComponent } from './farmer-form-container.component';

describe('FormContainerComponent', () => {
  let component: FarmerFormContainerComponent;
  let fixture: ComponentFixture<FarmerFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
