import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAdminEditBranchComponent } from './local-admin-edit-branch.component';

describe('LocalAdminEditBranchComponent', () => {
  let component: LocalAdminEditBranchComponent;
  let fixture: ComponentFixture<LocalAdminEditBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalAdminEditBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalAdminEditBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
