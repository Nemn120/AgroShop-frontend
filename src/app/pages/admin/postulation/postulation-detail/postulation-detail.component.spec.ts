import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostulationDetailComponent } from './postulation-detail.component';

describe('PostulationDetailComponent', () => {
  let component: PostulationDetailComponent;
  let fixture: ComponentFixture<PostulationDetailComponent>;

  beforeEach(waitForAsync(() => {
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
