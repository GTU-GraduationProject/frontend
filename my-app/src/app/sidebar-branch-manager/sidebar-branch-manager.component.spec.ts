import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarBranchManagerComponent } from './sidebar-branch-manager.component';

describe('SidebarBranchManagerComponent', () => {
  let component: SidebarBranchManagerComponent;
  let fixture: ComponentFixture<SidebarBranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarBranchManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarBranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
