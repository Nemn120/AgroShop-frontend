import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostulationApplicantsDetailComponent } from './postulation-applicants-detail.component';

describe('PostulationApplicantsDetailComponent', () => {
  let component: PostulationApplicantsDetailComponent;
  let fixture: ComponentFixture<PostulationApplicantsDetailComponent>;

  beforeEach(waitForAsync(() => {
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
