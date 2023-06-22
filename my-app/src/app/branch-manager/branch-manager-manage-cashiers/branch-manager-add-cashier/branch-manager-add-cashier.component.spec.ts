import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchManagerAddCashierComponent } from './branch-manager-add-cashier.component';

describe('BranchManagerAddCashierComponent', () => {
  let component: BranchManagerAddCashierComponent;
  let fixture: ComponentFixture<BranchManagerAddCashierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchManagerAddCashierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchManagerAddCashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
