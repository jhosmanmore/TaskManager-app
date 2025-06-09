import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

//const API_URL = 'http://localhost:4000/api/auth';
const API_URL = `${environment.apiUrl}/auth`;

@Injectable({ providedIn: 'root' })
export class AuthService {

  private tokenKey = 'token';

  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  register(user: { name: string, username: string; password: string }): Observable<any> {
    return this.http.post(`${API_URL}/register`, user);
  }

  login(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${API_URL}/login`, user).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          const payload = JSON.parse(atob(res.token.split('.')[1]));
          localStorage.setItem('name', payload.name || '');
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}