import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOwnerItemStatisticsComponent } from './product-owner-item-statistics.component';

describe('ProductOwnerItemStatisticsComponent', () => {
  let component: ProductOwnerItemStatisticsComponent;
  let fixture: ComponentFixture<ProductOwnerItemStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductOwnerItemStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductOwnerItemStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
