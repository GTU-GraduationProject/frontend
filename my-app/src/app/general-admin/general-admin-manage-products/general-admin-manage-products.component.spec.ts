import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAdminManageProductsComponent } from './general-admin-manage-products.component';

describe('GeneralAdminManageProductsComponent', () => {
  let component: GeneralAdminManageProductsComponent;
  let fixture: ComponentFixture<GeneralAdminManageProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAdminManageProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralAdminManageProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
