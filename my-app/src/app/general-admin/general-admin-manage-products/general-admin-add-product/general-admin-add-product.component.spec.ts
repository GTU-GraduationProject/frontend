import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAdminAddProductComponent } from './general-admin-add-product.component';

describe('GeneralAdminAddProductComponent', () => {
  let component: GeneralAdminAddProductComponent;
  let fixture: ComponentFixture<GeneralAdminAddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAdminAddProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralAdminAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
