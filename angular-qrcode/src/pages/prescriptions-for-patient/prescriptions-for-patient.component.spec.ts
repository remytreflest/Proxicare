import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionsForPatientComponent } from './prescriptions-for-patient.component';

describe('PrescriptionsForPatientComponent', () => {
  let component: PrescriptionsForPatientComponent;
  let fixture: ComponentFixture<PrescriptionsForPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrescriptionsForPatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescriptionsForPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
