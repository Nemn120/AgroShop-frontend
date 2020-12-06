import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationReplyComponent } from './postulation-reply.component';

describe('PostulationReplyComponent', () => {
  let component: PostulationReplyComponent;
  let fixture: ComponentFixture<PostulationReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulationReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulationReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
