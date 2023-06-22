import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAdminAddBranchComponent } from './local-admin-add-branch.component';

describe('LocalAdminAddBranchComponent', () => {
  let component: LocalAdminAddBranchComponent;
  let fixture: ComponentFixture<LocalAdminAddBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalAdminAddBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalAdminAddBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
