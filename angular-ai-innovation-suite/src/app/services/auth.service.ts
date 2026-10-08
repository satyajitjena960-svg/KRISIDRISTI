import { Injectable, signal } from '@angular/core';

export interface User {
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<User | null>(this.getStoredUser());

  private getStoredUser(): User | null {
    const data = localStorage.getItem('ai_suite_user');
    return data ? JSON.parse(data) : null;
  }

  login(email: string): User {
    const name = email.split('@')[0].replace('.', ' ');
    const user: User = {
      email,
      name: name.charAt(0).toUpperCase() + name.slice(1)
    };
    localStorage.setItem('ai_suite_user', JSON.stringify(user));
    this.currentUser.set(user);
    return user;
  }

  register(name: string, email: string): User {
    const user: User = { email, name };
    localStorage.setItem('ai_suite_user', JSON.stringify(user));
    this.currentUser.set(user);
    return user;
  }

  logout(): void {
    localStorage.removeItem('ai_suite_user');
    this.currentUser.set(null);
  }
}
