import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { environment } from '../environment';
import { AuthService } from '@auth0/auth0-angular';
import { RolesEnum } from '../resources/rolesEnum';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User | null = null;
  private rolesLoadedSubject = new BehaviorSubject<boolean>(false);
  rolesLoaded$ = this.rolesLoadedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {}

  getUserById(userId: string): void {
    this.http.get<User>(`${environment.urls.back}/user`).subscribe({
      next: (user) => {
        console.log("Utilisateur connecté")
        this.user = user
        console.log(this.user)
        this.rolesLoadedSubject.next(true);
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

  getRoles(): RolesEnum[] | null {
    if (this.user == null)
      return null;

    return this.user.Roles.split(',')
      .map(r => r.trim())
      .filter(r => Object.values(RolesEnum).includes(r as RolesEnum))
      .map(r => r as RolesEnum);
  }

  hasRole(required: RolesEnum): boolean {
    let roles = this.getRoles();

    if (roles == null)
      return false;

    return roles.includes(required);
  }

  registerUser(user: User): Observable<boolean> {

    let userDto = {
      firstName: user.FirstName,
      lastName: user.LastName,
      email: ''
    };

    this.auth.user$.pipe(map(user => user?.name)).subscribe(email =>
    {
      if (!email) {
        throw new Error("Email requis pour initialiser l'utilisateur.");
      }
      userDto.email = email;
    });

    return this.http.post<User>(`${environment.urls.back}/register/user`, userDto).pipe(
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
