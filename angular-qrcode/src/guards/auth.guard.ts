import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export const authGuard: CanActivateFn = (
  route,
  state
): Observable<boolean | UrlTree> => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    take(1),
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        // Stocker l'URL de destination pour plus tard
        sessionStorage.setItem('redirectAfterLogin', state.url);
        // Déclencher la redirection vers Auth0
        auth.loginWithRedirect({
            appState: {
                target: state.url
            }
        });
      }
    }),
    map((isAuthenticated) => {
      // Bloquer l'accès en attendant l'authentification
      return isAuthenticated;
    })
  );
};
