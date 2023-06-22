import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAdminEditBrandComponent } from './general-admin-edit-brand.component';

describe('GeneralAdminEditBrandComponent', () => {
  let component: GeneralAdminEditBrandComponent;
  let fixture: ComponentFixture<GeneralAdminEditBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAdminEditBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralAdminEditBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
