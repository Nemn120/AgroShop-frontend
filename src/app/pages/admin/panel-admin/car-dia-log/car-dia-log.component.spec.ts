import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDiaLogComponent } from './car-dia-log.component';

describe('CarDiaLogComponent', () => {
  let component: CarDiaLogComponent;
  let fixture: ComponentFixture<CarDiaLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarDiaLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDiaLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
