import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  name = "";
  password = '';
  error = '';
  success = '';
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!passwordRegex.test(this.password)) {
      this.error = 'La contraseña debe tener al menos 6 caracteres, incluir letras y al menos un número.';
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.success = '';

    this.auth.register({ username: this.username, name: this.name, password: this.password }).subscribe({
      next: () => {
        this.success = 'Registrado con éxito, ahora inicia sesión';
        this.error = '';
        this.clearForm();
        this.isLoading = false;
      },
      error: err => {
        if (err.status === 409) {
          this.error = 'El nombre de usuario ya está en uso. Por favor elige otro.';
        } else {
          this.error = err.error?.message || 'Error al registrarse';
          this.clearForm();
        }
        this.isLoading = false;
      }
    });
  }

  get isPasswordTooShort(): boolean {
    return this.password.length > 0 && this.password.length < 6;
  }

  get isPasswordMissingNumber(): boolean {
    return this.password.length > 0 && !/\d/.test(this.password);
  }

  get isPasswordMissingLetter(): boolean {
    return this.password.length > 0 && !/[a-zA-Z]/.test(this.password);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  clearForm() {
    this.username = '';
    this.name = '';
    this.password = '';
  }
}
