import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOwnerBranchStatisticsComponent } from './product-owner-branch-statistics.component';

describe('ProductOwnerBranchStatisticsComponent', () => {
  let component: ProductOwnerBranchStatisticsComponent;
  let fixture: ComponentFixture<ProductOwnerBranchStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductOwnerBranchStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductOwnerBranchStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
