import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAdminAddTechnicalStaffComponent } from './local-admin-add-technical-staff.component';

describe('LocalAdminAddTechnicalStaffComponent', () => {
  let component: LocalAdminAddTechnicalStaffComponent;
  let fixture: ComponentFixture<LocalAdminAddTechnicalStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalAdminAddTechnicalStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalAdminAddTechnicalStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
