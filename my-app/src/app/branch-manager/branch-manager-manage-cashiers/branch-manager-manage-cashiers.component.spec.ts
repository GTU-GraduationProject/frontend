import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchManagerManageCashiersComponent } from './branch-manager-manage-cashiers.component';

describe('BranchManagerManageCashiersComponent', () => {
  let component: BranchManagerManageCashiersComponent;
  let fixture: ComponentFixture<BranchManagerManageCashiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchManagerManageCashiersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchManagerManageCashiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
