import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../environment';

@Component({
  selector: 'app-create-prescription',
  standalone: true,
  templateUrl: './create-prescription.component.html',
  styleUrl: './create-prescription.component.scss',
  imports: [CommonModule, ReactiveFormsModule],
})
export class CreatePrescriptionComponent implements OnInit {
  form!: FormGroup;
  healthcareActs: any[] = [];
  message = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      socialSecurityNumber: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      acts: this.fb.array([]),
    });

    this.addAct();
    this.loadHealthcareActs();
  }

  get acts(): FormArray {
    return this.form.get('acts') as FormArray;
  }

  addAct(): void {
    this.acts.push(
      this.fb.group({
        id: ['', Validators.required],
        occurrencesPerDay: this.fb.control(
          { value: 1, disabled: true },
          [Validators.required, Validators.min(1), Validators.max(1)]
        ),
      })
    );
  }

  removeAct(index: number): void {
    this.acts.removeAt(index);
  }

  loadHealthcareActs(): void {
    this.http.get(`${environment.urls.back}/healthcare/acts`).subscribe({
      next: (acts: any) => (this.healthcareActs = acts),
      error: (err) => console.error('Erreur chargement actes', err),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.http.post(`${environment.urls.back}/prescriptions`, this.form.getRawValue()).subscribe({
      next: () => {
        this.message = "Ajout de la prescription fait avec succès"
        this.form.reset();
        this.acts.clear();
      },
      error: (err) => {
        this.message = err.error.message;
      },
    });
  }
}