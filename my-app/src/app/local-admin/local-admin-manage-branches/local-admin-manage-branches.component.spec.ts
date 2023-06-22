import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAdminManageBranchesComponent } from './local-admin-manage-branches.component';

describe('LocalAdminManageBranchesComponent', () => {
  let component: LocalAdminManageBranchesComponent;
  let fixture: ComponentFixture<LocalAdminManageBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalAdminManageBranchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalAdminManageBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
