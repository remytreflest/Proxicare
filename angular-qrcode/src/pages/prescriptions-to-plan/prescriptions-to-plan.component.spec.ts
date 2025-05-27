import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionsToPlanComponent } from './prescriptions-to-plan.component';

describe('PrescriptionsToPlanComponent', () => {
  let component: PrescriptionsToPlanComponent;
  let fixture: ComponentFixture<PrescriptionsToPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrescriptionsToPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescriptionsToPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
