import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationDetailComponent } from './postulation-detail.component';

describe('PostulationDetailComponent', () => {
  let component: PostulationDetailComponent;
  let fixture: ComponentFixture<PostulationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
