import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataClientComponent } from './data-client.component';

describe('DataClientComponent', () => {
  let component: DataClientComponent;
  let fixture: ComponentFixture<DataClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
