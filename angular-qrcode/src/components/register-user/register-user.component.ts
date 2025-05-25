import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/userService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {

  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router)
  {
    this.userForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.registerUser(this.userForm.value).subscribe({
        next: (res) => {
          console.log('Utilisateur créé :', res)
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Erreur création utilisateur :', err)
      });
    }
  }
}
