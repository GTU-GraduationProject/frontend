import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOwnerSeeItemDetailsComponent } from './product-owner-see-item-details.component';

describe('ProductOwnerSeeItemDetailsComponent', () => {
  let component: ProductOwnerSeeItemDetailsComponent;
  let fixture: ComponentFixture<ProductOwnerSeeItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductOwnerSeeItemDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductOwnerSeeItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
