import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamerMapComponent } from './famer-map.component';

describe('FamerMapComponent', () => {
  let component: FamerMapComponent;
  let fixture: ComponentFixture<FamerMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamerMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
