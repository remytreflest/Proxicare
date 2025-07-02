import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { environment } from '../environment';
import { AuthService } from '@auth0/auth0-angular';
import { RolesEnum } from '../resources/rolesEnum';
import { Appointment } from '../models/appointement';


@Injectable({
  providedIn: 'root'
})

export class PlanningService {

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {}

  getAppointements(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${environment.urls.back}/appointments/`).pipe(
      catchError((err) => {
        console.error('Erreur lors de la récupération des rendez-vous', err);
        return of([] as Appointment[]);
      })
    );
  }
}