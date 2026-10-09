import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface UserAccount {
  id?: number;
  phoneNumber: string;
  fullName: string;
  role: string;
  preferredLanguage: string;
  token?: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
  phoneNumber: string;
  fullName: string;
  role: string;
  preferredLanguage: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  private userSignal = signal<UserAccount | null>(this.getStoredUser());
  currentUser = computed(() => this.userSignal());
  isLoggedIn = computed(() => !!this.userSignal());

  constructor(private http: HttpClient, private router: Router) {}

  private getStoredUser(): UserAccount | null {
    const raw = localStorage.getItem('krishi_user');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
    return null;
  }

  getToken(): string | null {
    return localStorage.getItem('krishi_token');
  }

  login(phoneNumber: string, password: string):Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { phoneNumber, password }).pipe(
      tap(res => this.handleAuthSuccess(res))
    );
  }

  sendOtp(phoneNumber: string): Observable<{ message: string; phoneNumber: string }> {
    return this.http.post<{ message: string; phoneNumber: string }>(`${this.apiUrl}/send-otp`, { phoneNumber });
  }

  verifyOtp(phoneNumber: string, otp: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/verify-otp`, { phoneNumber, otp }).pipe(
      tap(res => this.handleAuthSuccess(res))
    );
  }

  register(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(res => this.handleAuthSuccess(res))
    );
  }

  quickDemoLogin(): void {
    // 1-Click Instant Login for low-literacy testing
    this.login('9876543210', 'password123').subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => {
        // Fallback demo mock session if backend is still booting
        const demoUser: UserAccount = {
          id: 1,
          phoneNumber: '9876543210',
          fullName: 'Ramesh Patel (किसान मित्र)',
          role: 'ROLE_FARMER',
          preferredLanguage: 'hi',
          token: 'demo-local-jwt-token'
        };
        localStorage.setItem('krishi_token', demoUser.token!);
        localStorage.setItem('krishi_user', JSON.stringify(demoUser));
        this.userSignal.set(demoUser);
        this.router.navigate(['/dashboard']);
      }
    });
  }

  private handleAuthSuccess(res: AuthResponse): void {
    const user: UserAccount = {
      id: res.userId,
      phoneNumber: res.phoneNumber,
      fullName: res.fullName,
      role: res.role,
      preferredLanguage: res.preferredLanguage,
      token: res.token
    };
    localStorage.setItem('krishi_token', res.token);
    localStorage.setItem('krishi_user', JSON.stringify(user));
    this.userSignal.set(user);
  }

  logout(): void {
    localStorage.removeItem('krishi_token');
    localStorage.removeItem('krishi_user');
    this.userSignal.set(null);
    this.router.navigate(['/login']);
  }
}
