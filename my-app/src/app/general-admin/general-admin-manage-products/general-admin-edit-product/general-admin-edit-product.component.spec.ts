import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAdminEditProductComponent } from './general-admin-edit-product.component';

describe('GeneralAdminEditProductComponent', () => {
  let component: GeneralAdminEditProductComponent;
  let fixture: ComponentFixture<GeneralAdminEditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAdminEditProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralAdminEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
