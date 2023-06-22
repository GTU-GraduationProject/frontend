import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLocalAdminComponent } from './sidebar-local-admin.component';

describe('SidebarLocalAdminComponent', () => {
  let component: SidebarLocalAdminComponent;
  let fixture: ComponentFixture<SidebarLocalAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarLocalAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarLocalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
