import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAuth0 } from '@auth0/auth0-angular';
import { environment } from '../environment';
import { authInterceptor } from '../interceptors/auth.interceptor';
import { UserService } from '../services/userService';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([
      authInterceptor
    ])),
    provideRouter(routes),
    provideAuth0(environment.provideAuth0),
    UserService
  ]
};
