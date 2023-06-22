import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAdminAddBrandComponent } from './general-admin-add-brand.component';

describe('GeneralAdminAddBrandComponent', () => {
  let component: GeneralAdminAddBrandComponent;
  let fixture: ComponentFixture<GeneralAdminAddBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAdminAddBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralAdminAddBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
