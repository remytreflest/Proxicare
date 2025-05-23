import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../../services/userService';
import { AuthService } from '@auth0/auth0-angular';
import { RouterOutlet } from '@angular/router';

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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe({
      next: (authUser) => {
        const sub = authUser?.sub;
        if (sub) {
          const userId = sub.split('|')[1]; // Auth0 format: "auth0|123456"
          this.userService.getUserById(userId);
        }
      },
      error: (err) => console.error('Erreur chargement utilisateur Auth0', err)
    });
  }
}
