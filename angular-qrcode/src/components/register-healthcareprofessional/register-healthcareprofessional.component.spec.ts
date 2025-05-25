import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterhealthcareprofessionalComponent } from './register-healthcareprofessional.component';

describe('RegisterhealthcareprofessionalComponent', () => {
  let component: RegisterhealthcareprofessionalComponent;
  let fixture: ComponentFixture<RegisterhealthcareprofessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterhealthcareprofessionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterhealthcareprofessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
