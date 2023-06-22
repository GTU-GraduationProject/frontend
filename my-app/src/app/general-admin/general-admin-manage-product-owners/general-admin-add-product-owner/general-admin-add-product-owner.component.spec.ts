import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAdminAddProductOwnerComponent } from './general-admin-add-product-owner.component';

describe('GeneralAdminAddProductOwnerComponent', () => {
  let component: GeneralAdminAddProductOwnerComponent;
  let fixture: ComponentFixture<GeneralAdminAddProductOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAdminAddProductOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralAdminAddProductOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
