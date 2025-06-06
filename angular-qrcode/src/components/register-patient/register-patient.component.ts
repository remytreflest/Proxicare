import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environment';
import { Router } from '@angular/router';
import { UserService } from '../../services/userService';

@Component({
  selector: 'app-register-patient',
  standalone: true,
  templateUrl: './register-patient.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class RegisterPatientComponent implements OnInit {
  form!: FormGroup;
  structures: any[] = [];
  message = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient, 
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      socialSecurityNumber: ['', Validators.required],
      structureId: ['', Validators.required],
    });

    this.http.get(`${environment.urls.back}/structures`).subscribe({
      next: (data: any) => this.structures = data,
      error: () => console.error('Erreur récupération structures')
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.http.post(`${environment.urls.back}/register/patient`, this.form.value).subscribe({
      next: () => {
        this.userService.refreshUser();
        this.router.navigate(['/account']);
      },
      error: (err) => {
        console.error(err);
        this.message = 'Erreur lors de la création du patient.';
      }
    });
  }
}
