import { Component } from '@angular/core';
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
export class AppComponent {
  qrCodeUrl: string | null = null;
  scannerEnabled = false;

  constructor(private userService: UserService, private auth: AuthService)
  {
    auth.user$.subscribe({
      next: (authUser) => {
        userService.getUserById(authUser!.sub!.split('|')[1]);
      },
      error: (err) => console.error('Erreur chargement utilisateur Auth0', err)
    })
  }
}
