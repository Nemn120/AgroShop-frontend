import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralViewComponent } from './central-view.component';

describe('CentralViewComponent', () => {
  let component: CentralViewComponent;
  let fixture: ComponentFixture<CentralViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentralViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
