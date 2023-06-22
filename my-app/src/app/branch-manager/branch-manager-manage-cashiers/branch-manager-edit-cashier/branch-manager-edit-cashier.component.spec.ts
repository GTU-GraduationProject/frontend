import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchManagerEditCashierComponent } from './branch-manager-edit-cashier.component';

describe('BranchManagerEditCashierComponent', () => {
  let component: BranchManagerEditCashierComponent;
  let fixture: ComponentFixture<BranchManagerEditCashierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchManagerEditCashierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchManagerEditCashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
