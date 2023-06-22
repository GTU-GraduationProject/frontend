import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchManagerAddCashierCheckoutComponent } from './branch-manager-add-cashier-checkout.component';

describe('BranchManagerAddCashierCheckoutComponent', () => {
  let component: BranchManagerAddCashierCheckoutComponent;
  let fixture: ComponentFixture<BranchManagerAddCashierCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchManagerAddCashierCheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchManagerAddCashierCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
