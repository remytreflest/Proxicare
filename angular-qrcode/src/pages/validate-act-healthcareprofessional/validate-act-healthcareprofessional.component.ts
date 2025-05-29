import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validate-act-healthcareprofessional',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validate-act-healthcareprofessional.component.html',
  styleUrls: ['./validate-act-healthcareprofessional.component.scss']
})
export class ValidateActHealthcareprofessionalComponent implements OnInit {
  statusType: 'success' | 'error' | null = null;
  message: string = '';
  patientName?: string;
  healthcareActName?: string;
  validatedAt?: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const prescriptionHealthcareActId = this.route.snapshot.paramMap.get('prescriptionHealthcareActId');
    const token = this.route.snapshot.paramMap.get('token');

    if (!prescriptionHealthcareActId || !token) {
      this.statusType = 'error';
      this.message = 'Paramètres d’URL invalides.';
      return;
    }

    this.http.get(`/api/validate/healthcareprofessional/${prescriptionHealthcareActId}/${token}`)
      .subscribe({
        next: (res: any) => {
          this.statusType = 'success';
          this.message = res.message;
          this.patientName = res.patientName;
          this.healthcareActName = res.healthcareAct;
          this.validatedAt = res.validatedAt;
        },
        error: (err: HttpErrorResponse) => {
          this.statusType = 'error';
          this.message = err.error?.message || 'Une erreur est survenue.';
        }
      });
  }
}
