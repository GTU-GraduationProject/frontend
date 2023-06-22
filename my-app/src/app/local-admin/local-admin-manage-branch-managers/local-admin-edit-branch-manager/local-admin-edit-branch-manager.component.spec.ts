import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAdminEditBranchManagerComponent } from './local-admin-edit-branch-manager.component';

describe('LocalAdminEditBranchManagerComponent', () => {
  let component: LocalAdminEditBranchManagerComponent;
  let fixture: ComponentFixture<LocalAdminEditBranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalAdminEditBranchManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalAdminEditBranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
