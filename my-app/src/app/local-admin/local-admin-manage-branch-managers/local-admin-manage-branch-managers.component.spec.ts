import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAdminManageBranchManagersComponent } from './local-admin-manage-branch-managers.component';

describe('LocalAdminManageBranchManagersComponent', () => {
  let component: LocalAdminManageBranchManagersComponent;
  let fixture: ComponentFixture<LocalAdminManageBranchManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalAdminManageBranchManagersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalAdminManageBranchManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
