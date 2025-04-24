import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { LogoutButtonComponent } from '../Auth0/logout-button/logout-button.component';
import { LoginButtonComponent } from '../Auth0/login-button/login-button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LoginButtonComponent, LogoutButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {

  /**
   * Constructeur du composant NavBar
   */
  constructor(public auth: AuthService) {}
}
