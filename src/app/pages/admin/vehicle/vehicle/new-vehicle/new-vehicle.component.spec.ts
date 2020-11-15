import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVehicleComponent } from './new-vehicle.component';

describe('NewVehicleComponent', () => {
  let component: NewVehicleComponent;
  let fixture: ComponentFixture<NewVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
