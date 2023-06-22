import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAdminAddLocalAdminComponent } from './general-admin-add-local-admin.component';

describe('GeneralAdminAddLocalAdminComponent', () => {
  let component: GeneralAdminAddLocalAdminComponent;
  let fixture: ComponentFixture<GeneralAdminAddLocalAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAdminAddLocalAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralAdminAddLocalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
