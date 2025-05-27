import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../environment';
import { CommonModule, DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-prescriptions-to-plan',
  templateUrl: './prescriptions-to-plan.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgClass
  ],
  providers: [DatePipe],
})
export class PrescriptionsToPlanComponent implements OnInit {
  prescriptions: any[] = [];
  formMap: { [id: number]: FormGroup } = {};

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fetchPrescriptions();
  }

  fetchPrescriptions(): void {
    this.http.get<any[]>(`${environment.urls.back}/prescriptions/healthcareprofessional`).subscribe({
      next: (data) => {
        this.prescriptions = data;
        data.forEach(prescription =>
          prescription.PrescriptionHealthcareActs.forEach((act: any) => {
            this.formMap[act.Id] = this.createAppointmentForm(act.Id);
            this.formMap[act.Id].patchValue({
              patientId: prescription.Patient.Id // ✅ ici on fournit le bon ID
            });
          })
        );
      },
      error: (err) => console.error('Erreur chargement prescriptions à planifier', err)
    });
  }

  createAppointmentForm(prescriptionHealthcareActId: number): FormGroup {
    return this.fb.group({
      patientId: ['', Validators.required], // ✅ Ajouter cette ligne
      prescriptionHealthcareActId: [prescriptionHealthcareActId, Validators.required],
      appointmentStartDate: ['', Validators.required],
      appointmentEndDate: ['', Validators.required],
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'PLANNED': return 'bg-primary text-white';
      case 'PERFORMED': return 'bg-success text-white';
      case 'CANCELLED': return 'bg-warning';
      default: return '';
    }
  }

  planAppointment(act: any): void {
    const form = this.formMap[act.Id];
    if (form.invalid) return;

    const body = {
      prescriptionHealthcareActId: act.Id,
      appointmentStartDate: form.value.appointmentStartDate,
      appointmentEndDate: form.value.appointmentEndDate,
      patientId: form.value.patientId,
    };

    this.http.post(`${environment.urls.back}/appointment`, body).subscribe({
      next: () => {
        act.Status = 'PLANNED'; // ou actualiser depuis le backend
        form.reset();
      },
      error: (err) => console.error('Erreur planification acte', err)
    });
  }
}
