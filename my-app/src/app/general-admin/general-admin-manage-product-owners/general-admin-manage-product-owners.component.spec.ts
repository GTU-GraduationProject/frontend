import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAdminManageProductOwnersComponent } from './general-admin-manage-product-owners.component';

describe('GeneralAdminManageProductOwnersComponent', () => {
  let component: GeneralAdminManageProductOwnersComponent;
  let fixture: ComponentFixture<GeneralAdminManageProductOwnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAdminManageProductOwnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralAdminManageProductOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
