import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.isLoading = true;
    this.errorMessage = '';
    this.authService.login({username: this.username, password: this.password}).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/main']);
      },
      error: () => {
        this.errorMessage = 'Credenciales inválidas';
        this.clearForm();
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  clearForm() {
    this.username = '';
    this.password = '';
  }

}