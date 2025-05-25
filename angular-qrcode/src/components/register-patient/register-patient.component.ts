import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-patient',
  standalone: true,
  templateUrl: './register-patient.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class RegisterPatientComponent implements OnInit {
  form!: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      socialSecurityNumber: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.http.post(`${environment.urls.back}/register/patient`, this.form.value).subscribe({
      next: () => this.router.navigate(['/account']),
      error: (err) => {
        console.error(err);
        this.message = 'Erreur lors de la création du patient.';
      }
    });
  }
}
