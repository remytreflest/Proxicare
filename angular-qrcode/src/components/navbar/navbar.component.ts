import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { LogoutButtonComponent } from '../Auth0/logout-button/logout-button.component';
import { LoginButtonComponent } from '../Auth0/login-button/login-button.component';
import { RouterModule } from '@angular/router';
import { HasRoleDirective } from '../../conditionalView/HasRoleDirective';
import { RolesEnum } from '../../resources/rolesEnum';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LoginButtonComponent, LogoutButtonComponent, RouterModule, HasRoleDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {

  RolesEnum = RolesEnum;

  constructor(public auth: AuthService) {}
}
