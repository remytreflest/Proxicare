import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateActHealthcareprofessionalComponent } from './validate-act-healthcareprofessional.component';

describe('ValidateActHealthcareprofessionalComponent', () => {
  let component: ValidateActHealthcareprofessionalComponent;
  let fixture: ComponentFixture<ValidateActHealthcareprofessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateActHealthcareprofessionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateActHealthcareprofessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
