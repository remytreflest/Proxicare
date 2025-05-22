import { Component } from '@angular/core';
import { RegisterUserComponent } from "../../components/register-user/register-user.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterUserComponent, NavbarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(){
    console.log("Bienvenue sur la page register");
  }
}
