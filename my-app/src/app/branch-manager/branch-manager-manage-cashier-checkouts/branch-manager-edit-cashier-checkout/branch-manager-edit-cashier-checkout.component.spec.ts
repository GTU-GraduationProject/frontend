import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchManagerEditCashierCheckoutComponent } from './branch-manager-edit-cashier-checkout.component';

describe('BranchManagerEditCashierCheckoutComponent', () => {
  let component: BranchManagerEditCashierCheckoutComponent;
  let fixture: ComponentFixture<BranchManagerEditCashierCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchManagerEditCashierCheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchManagerEditCashierCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
