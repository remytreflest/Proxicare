import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-validate-act-patient',
  imports: [
      CommonModule
  ],
  templateUrl: './validate-act-patient.component.html',
  styleUrls: ['./validate-act-patient.component.scss']
})
export class ValidateActPatientComponent implements OnInit, OnDestroy {
  prescriptionHealthcareActId!: number;
  qrCodeDataUrl: string | null = null;
  statusMessage: string | null = null;
  statusType: 'success' | 'error' | null = null;
  intervalSub!: Subscription;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('prescriptionHealthcareActId');
    console.log(param)
    if (!param || isNaN(+param)) {
      this.statusMessage = "Identifiant de soin invalide.";
      this.statusType = 'error';
      return;
    }

    this.prescriptionHealthcareActId = +param;
    this.fetchQrCode();

    this.intervalSub = interval(15000)
      .pipe(switchMap(() => this.http.get(`${environment.urls.back}/qrcode/patient/${this.prescriptionHealthcareActId}`, { observe: 'response' })))
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.statusMessage = 'Votre soin a bien été validé.';
            this.statusType = 'success';
            this.qrCodeDataUrl = null;
            this.intervalSub.unsubscribe();
          } else if (res.status === 201) {
            this.qrCodeDataUrl = (res.body as any).qrCodeDataUrl;
            this.statusMessage = null;
            this.statusType = null;
          }
        },
        error: (err: HttpErrorResponse) => {
          this.statusMessage = err.error?.message || 'Une erreur est survenue.';
          this.statusType = 'error';
          this.qrCodeDataUrl = null;
          this.intervalSub.unsubscribe();
        }
      });
  }

  fetchQrCode(): void {
    this.http.get(`${environment.urls.back}//qrcode/patient/${this.prescriptionHealthcareActId}`, { observe: 'response' })
      .subscribe({
        next: (res) => {
          if (res.status === 201) {
            this.qrCodeDataUrl = (res.body as any).qrCodeDataUrl;
          } else if (res.status === 200) {
            this.statusMessage = 'Votre soin a bien été validé.';
            this.statusType = 'success';
            this.qrCodeDataUrl = null;
          }
        },
        error: (err: HttpErrorResponse) => {
          if(err.status == 400)
          {
            this.statusMessage = 'Votre soin a bien été validé.';
            this.statusType = 'success';
          } else {
            this.statusMessage = 'Votre soin a bien été validé.';
            this.statusType = 'success';
          }
          this.qrCodeDataUrl = null;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.intervalSub) {
      this.intervalSub.unsubscribe();
    }
  }
}
