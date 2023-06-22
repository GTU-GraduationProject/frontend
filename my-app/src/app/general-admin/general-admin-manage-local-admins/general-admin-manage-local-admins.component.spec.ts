import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAdminManageLocalAdminsComponent } from './general-admin-manage-local-admins.component';

describe('GeneralAdminManageLocalAdminsComponent', () => {
  let component: GeneralAdminManageLocalAdminsComponent;
  let fixture: ComponentFixture<GeneralAdminManageLocalAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAdminManageLocalAdminsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralAdminManageLocalAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
