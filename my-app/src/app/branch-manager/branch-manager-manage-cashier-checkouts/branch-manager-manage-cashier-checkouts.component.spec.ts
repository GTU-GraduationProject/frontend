import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchManagerManageCashierCheckoutsComponent } from './branch-manager-manage-cashier-checkouts.component';

describe('BranchManagerManageCashierCheckoutComponent', () => {
  let component: BranchManagerManageCashierCheckoutsComponent;
  let fixture: ComponentFixture<BranchManagerManageCashierCheckoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchManagerManageCashierCheckoutsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchManagerManageCashierCheckoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
