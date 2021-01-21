import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostulationApplicantsComponent } from './postulation-applicants.component';

describe('PostulationApplicantsComponent', () => {
  let component: PostulationApplicantsComponent;
  let fixture: ComponentFixture<PostulationApplicantsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulationApplicantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulationApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
