import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAdminComponent } from './local-admin.component';

describe('LocalAdminComponent', () => {
  let component: LocalAdminComponent;
  let fixture: ComponentFixture<LocalAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
