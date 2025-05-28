import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/userService';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RolesLoadedGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.userService.rolesLoaded$.pipe(
      take(1),
      map(loaded => {
        if (loaded) {
          return true;
        } else {
          return state.url === '/' ? true : this.router.createUrlTree(['/']);
        }
      })
    );
  }
}
