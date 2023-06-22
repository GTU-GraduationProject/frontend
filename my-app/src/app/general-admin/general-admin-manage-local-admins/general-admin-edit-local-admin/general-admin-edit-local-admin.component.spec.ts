import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAdminEditLocalAdminComponent } from './general-admin-edit-local-admin.component';

describe('GeneralAdminEditLocalAdminComponent', () => {
  let component: GeneralAdminEditLocalAdminComponent;
  let fixture: ComponentFixture<GeneralAdminEditLocalAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAdminEditLocalAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralAdminEditLocalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
