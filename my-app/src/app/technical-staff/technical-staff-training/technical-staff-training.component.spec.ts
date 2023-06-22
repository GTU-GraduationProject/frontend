import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalStaffTrainingComponent } from './technical-staff-training.component';

describe('TechnicalStaffTrainingComponent', () => {
  let component: TechnicalStaffTrainingComponent;
  let fixture: ComponentFixture<TechnicalStaffTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalStaffTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalStaffTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
