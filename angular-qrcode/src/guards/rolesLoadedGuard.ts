import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/userService';
import { timeout, catchError, map, take, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RolesLoadedGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.log("RolesLoadedGuard")
    return this.userService.rolesLoaded$.pipe(
      filter(loaded => loaded),
      take(1),
      timeout(5000), // 5 secondes max
      catchError(() => of(false))                 
    );
  }
}