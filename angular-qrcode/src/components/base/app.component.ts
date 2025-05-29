import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../../services/userService';
import { AuthService } from '@auth0/auth0-angular';
import { Router, RouterOutlet } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgxScannerQrcodeModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.auth.isAuthenticated$.pipe(take(1)).subscribe(isAuth => {
      if (!isAuth) {
        const fullUrl = window.location.pathname + window.location.search;
        console.log('Not authenticated, current path:', fullUrl);

        // Ne redirige que si ce n'est pas déjà la racine
        if (fullUrl !== '/') {
          this.auth.loginWithRedirect({
            appState: { target: fullUrl }
          });
        }
      } else {
        // Redirige après login si nécessaire
        this.auth.appState$.pipe(take(1)).subscribe(appState => {
          const target = appState?.target;
          if (target && this.router.url !== target) {
            this.router.navigateByUrl(target);
          }
        });
      }
    });

    this.auth.user$.subscribe({
      next: (authUser) => {
        const sub = authUser?.sub;
        if (sub) {
          this.userService.getUserById();
          console.log('AppComponent --> his.userService.getUserById()')
        }
      },
      error: (err) => console.error('Erreur chargement utilisateur Auth0', err)
    });
  }
}
