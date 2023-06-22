import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAdminAddBranchManagerComponent } from './local-admin-add-branch-manager.component';

describe('LocalAdminAddBranchManagerComponent', () => {
  let component: LocalAdminAddBranchManagerComponent;
  let fixture: ComponentFixture<LocalAdminAddBranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalAdminAddBranchManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalAdminAddBranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
