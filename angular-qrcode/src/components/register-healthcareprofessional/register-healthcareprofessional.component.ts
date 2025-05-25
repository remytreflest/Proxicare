import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { enumToArray } from '../../herlpers/enumHelper';
import { SpecialityEnum } from '../../resources/specialityEnum';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-healthcareprofessional',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-healthcareprofessional.component.html',
  styleUrl: './register-healthcareprofessional.component.scss'
})
export class RegisterhealthcareprofessionalComponent {
  form!: FormGroup;
  specialities = enumToArray(SpecialityEnum); // adapte selon ton enum
  structures: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      speciality: ['', Validators.required],
      structureId: [null, Validators.required],
      idn: ['', Validators.required],
    });

    this.http.get<any[]>(`${environment.urls.back}/structures`).subscribe({
      next: (data) => (this.structures = data),
      error: (err) => console.error('Erreur chargement structures', err),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    const payload = {
      userId: formValue.userId,
      speciality: formValue.speciality,
      structureId: formValue.structureId,
      idn: formValue.idn,
    };

    this.http.post(`${environment.urls.back}/register/healthcareprofessional`, payload).subscribe({
      next: (res) => this.router.navigate(['/account']),
      error: (err) => console.error('Erreur lors de la création du soignant', err),
    });
  }
}
