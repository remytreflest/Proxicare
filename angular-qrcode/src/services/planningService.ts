import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { environment } from '../environment';
import { AuthService } from '@auth0/auth0-angular';
import { RolesEnum } from '../resources/rolesEnum';

export interface Appointement {
  Id: number;
  Title: string;
  Start: Date;
  End: Date;
  CaregiverID : number;
  PatientID : number;
  Description: string;
  Acts: Act[];
}

export interface Act {
  Id: number;
  Name: string;
  Description: string;
  Price: number;
  CreatedAt: Date;
  UpdatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})

export class PlanningService {

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {}

  getAppointementsByUserId(userId: string): Observable<Appointement[]> {
    return this.http.get<Appointement[]>(`${environment.urls.back}/planning/${userId}`).pipe(
      catchError((err) => {
        console.error('Erreur lors de la récupération des rendez-vous', err);
        return of([] as Appointement[]);
      })
    );
  }
}