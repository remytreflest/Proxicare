import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PrescriptionHealthcareactsStatus } from '../../resources/prescriptionHealthcareactsStatus';
import { environment } from '../../environment';

@Component({
  selector: 'app-prescriptions-for-patient',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './prescriptions-for-patient.component.html',
  styleUrls: ['./prescriptions-for-patient.component.scss']
})
export class PrescriptionsForPatientComponent implements OnInit {
  prescriptions: any[] = [];
  readonly Status = PrescriptionHealthcareactsStatus;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http.get<any[]>(`${environment.urls.back}/prescriptions/patient`).subscribe({
      next: (acts) => {
        this.prescriptions = acts;
        console.log(this.prescriptions)
      },
      error: () => this.prescriptions = []
    });
  }

  goToValidation(actId: number, status: string): void {
    if (status === this.Status.PLANNED) {
      this.router.navigate(['/validate-act/patient', actId]);
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case this.Status.PLANNED:
        return 'bg-primary';
      case this.Status.PERFORMED:
        return 'bg-success';
      case this.Status.CANCELLED:
        return 'bg-danger';
      case this.Status.TO_BE_PLANNED:
        return 'bg-warning text-dark';
      default:
        return 'bg-secondary';
    }
  }
}
