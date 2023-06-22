import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAdminManageBrandsComponent } from './general-admin-manage-brands.component';

describe('GeneralAdminManageBrandsComponent', () => {
  let component: GeneralAdminManageBrandsComponent;
  let fixture: ComponentFixture<GeneralAdminManageBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAdminManageBrandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralAdminManageBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
