import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarGeneralAdminComponent } from './sidebar-general-admin.component';

describe('SidebarGeneralAdminComponent', () => {
  let component: SidebarGeneralAdminComponent;
  let fixture: ComponentFixture<SidebarGeneralAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarGeneralAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarGeneralAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
