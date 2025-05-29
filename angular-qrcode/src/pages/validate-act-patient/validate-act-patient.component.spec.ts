import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateActPatientComponent } from './validate-act-patient.component';

describe('ValidateActPatientComponent', () => {
  let component: ValidateActPatientComponent;
  let fixture: ComponentFixture<ValidateActPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateActPatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateActPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
