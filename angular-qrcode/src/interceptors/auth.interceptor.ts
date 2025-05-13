import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { combineLatest, from } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const auth = inject(AuthService);

  return combineLatest([
    from(auth.getAccessTokenSilently()),
    auth.user$.pipe(take(1))
  ]).pipe(
    switchMap(([token, user]) => {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'X-Userid': user?.sub?.split('|')[1] ?? ''
        }
      });
      return next(authReq);
    })
  );
};
