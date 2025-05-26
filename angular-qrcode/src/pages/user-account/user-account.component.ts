import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { Prescription } from '../../models/prescription';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-account.component.html',
})
export class UserAccountComponent implements OnInit {
  user!: User;
  activeTab!: string;
  prescriptions: Prescription[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    
    // 1. Récupérer User
    this.http.get(`${environment.urls.back}/user`).subscribe({
      next: (data) => {
        this.user = data as User
        this.loadPrescriptions();
        this.activeTab = this.getInitialActiveTab()
      }
    });
  }

  loadPrescriptions() {
    this.http.get(`${environment.urls.back}/prescriptions`).subscribe({
      next: (data: any) => {
        this.prescriptions = data;
      },
      error: (err) => console.error("Erreur chargement prescriptions:", err)
    });
  }

  getInitialActiveTab() : string {
    if (this.user.Patient == null && this.user.HealthcareProfessional != null){
      return 'healthcareprofessional';
    }
    return 'patient';
  }

  goToRegister(type: 'patient' | 'healthcareprofessional') {
    this.router.navigate([`/register/${type}`]);
  }
}
