import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationApplicantsDetailComponent } from './postulation-applicants-detail.component';

describe('PostulationApplicantsDetailComponent', () => {
  let component: PostulationApplicantsDetailComponent;
  let fixture: ComponentFixture<PostulationApplicantsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulationApplicantsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulationApplicantsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
