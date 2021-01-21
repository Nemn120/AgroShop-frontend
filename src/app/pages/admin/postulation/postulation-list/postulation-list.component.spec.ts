import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostulationListComponent } from './postulation-list.component';

describe('PostulationListComponent', () => {
  let component: PostulationListComponent;
  let fixture: ComponentFixture<PostulationListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
