import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTechnicalStaffComponent } from './sidebar-technical-staff.component';

describe('SidebarTechnicalStaffComponent', () => {
  let component: SidebarTechnicalStaffComponent;
  let fixture: ComponentFixture<SidebarTechnicalStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarTechnicalStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarTechnicalStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
