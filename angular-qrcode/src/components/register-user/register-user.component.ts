import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/userService';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {

  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService)
  {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.registerUser(this.userForm.value).subscribe({
        next: (res) => console.log('Utilisateur créé :', res),
        error: (err) => console.error('Erreur création utilisateur :', err)
      });
    }
  }
}
