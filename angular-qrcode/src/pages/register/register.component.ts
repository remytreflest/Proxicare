import { Component } from '@angular/core';
import { RegisterUserComponent } from "../../components/register-user/register-user.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterUserComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  constructor(){
    console.log("Bienvenue sur la page register");
  }
}
