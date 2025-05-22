import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../environment';
import { AuthService } from '@auth0/auth0-angular';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  // autres champs si besoin
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User | null = null;

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {}

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

    this.auth.user$.pipe(map(user => user?.name)).subscribe(email =>
    {
      if (!email) {
        throw new Error("Email requis pour initialiser l'utilisateur.");
      }
      user.email = email;
    });

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
