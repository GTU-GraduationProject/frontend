import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAdminManageTechnicalStaffsComponent } from './local-admin-manage-technical-staffs.component';

describe('LocalAdminManageTechnicalStaffsComponent', () => {
  let component: LocalAdminManageTechnicalStaffsComponent;
  let fixture: ComponentFixture<LocalAdminManageTechnicalStaffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalAdminManageTechnicalStaffsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalAdminManageTechnicalStaffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
