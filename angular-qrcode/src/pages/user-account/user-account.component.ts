import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/userService';
import { environment } from '../../environment';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-account.component.html',
})
export class UserAccountComponent implements OnInit {
  user!: User;
  activeTab!: string;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    
    // 1. Récupérer User
    this.http.get(`${environment.urls.back}/user`).subscribe({
      next: (data) => {
        this.user = data as User
        this.activeTab = this.getInitialActiveTab()
      }
    });
  }

  getInitialActiveTab() : string {
    if (this.user.HealthcareProfessional != null){
      return 'caregiver';
    }
    if (this.user.Patient != null){
      return 'patient';
    }
    return '';
  }

  goToRegister(type: 'patient' | 'caregiver') {
    this.router.navigate([`/register/${type}`]);
  }
}
