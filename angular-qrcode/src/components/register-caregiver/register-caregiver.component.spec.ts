import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCaregiverComponent } from './register-caregiver.component';

describe('RegisterCaregiverComponent', () => {
  let component: RegisterCaregiverComponent;
  let fixture: ComponentFixture<RegisterCaregiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCaregiverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCaregiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
