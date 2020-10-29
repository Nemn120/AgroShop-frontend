import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPanelComponent } from './sidebar-panel.component';

describe('SidebarPanelComponent', () => {
  let component: SidebarPanelComponent;
  let fixture: ComponentFixture<SidebarPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
