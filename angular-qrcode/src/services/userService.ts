import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { environment } from '../environment';

export interface User {
  Id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Role: string;
  // autres champs si besoin
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  getUserById(userId: string): void {
    this.http.get<User>(`${environment.urls.back}/register/user/${userId}`).subscribe({
      next: (user) => {
        console.log("Utilisateur connecté")
        console.log(this.user)
        this.user = user
      },
      error: (err) => {
        console.error('L\'utilisateur n\'existe pas et va être créé', err)
        this.router.navigate(['/register']);
      }
    });
  }

  getUser(){
    return this.user;
  }

  registerUser(user: User): Observable<boolean> {
    console.log(user);
    return this.http.post<User>(`${environment.urls.back}/register/user`, user).pipe(
      map((res) => {
        this.user = res;
        console.log("Utilisateur connecté après inscription automatique")
        console.log(this.user)
        return true;
      }),
      catchError((err) => {
        console.error('Erreur lors de la création de l\'utilisateur', err);
        return of(false);
      })
    );
  }
}
