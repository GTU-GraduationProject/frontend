import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAdminEditTechnicalStaffComponent } from './local-admin-edit-technical-staff.component';

describe('LocalAdminEditTechnicalStaffComponent', () => {
  let component: LocalAdminEditTechnicalStaffComponent;
  let fixture: ComponentFixture<LocalAdminEditTechnicalStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalAdminEditTechnicalStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalAdminEditTechnicalStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
