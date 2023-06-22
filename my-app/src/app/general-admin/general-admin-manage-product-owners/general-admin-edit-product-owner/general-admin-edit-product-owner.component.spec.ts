import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAdminEditProductOwnerComponent } from './general-admin-edit-product-owner.component';

describe('GeneralAdminEditProductOwnerComponent', () => {
  let component: GeneralAdminEditProductOwnerComponent;
  let fixture: ComponentFixture<GeneralAdminEditProductOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAdminEditProductOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralAdminEditProductOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
