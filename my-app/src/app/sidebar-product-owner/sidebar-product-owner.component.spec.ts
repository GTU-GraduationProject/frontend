import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarProductOwnerComponent } from './sidebar-product-owner.component';

describe('SidebarProductOwnerComponent', () => {
  let component: SidebarProductOwnerComponent;
  let fixture: ComponentFixture<SidebarProductOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarProductOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarProductOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
