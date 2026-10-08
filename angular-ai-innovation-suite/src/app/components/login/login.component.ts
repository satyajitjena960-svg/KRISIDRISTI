import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div class="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-xl space-y-6">
        <div class="text-center space-y-2">
          <div class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-bold mx-auto shadow-lg shadow-indigo-500/30">
            <i class="fa-solid fa-lock"></i>
          </div>
          <h2 class="text-2xl font-extrabold text-gray-900 dark:text-slate-100">Welcome Back</h2>
          <p class="text-xs text-gray-500 dark:text-slate-400">Sign in to access your AI Innovation Suite dashboard</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Email Address</label>
            <input type="email" [(ngModel)]="email" name="email" required placeholder="user@example.com" class="w-full bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-100 text-sm rounded-2xl px-4 py-3 border-none outline-none focus:ring-2 focus:ring-indigo-500">
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Password</label>
            <input type="password" [(ngModel)]="password" name="password" required placeholder="••••••••" class="w-full bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-100 text-sm rounded-2xl px-4 py-3 border-none outline-none focus:ring-2 focus:ring-indigo-500">
          </div>

          <button type="submit" [disabled]="!email.trim() || !password.trim()" class="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm transition-all shadow-md shadow-indigo-500/20">
            Sign In
          </button>
        </form>

        <div class="text-center text-xs text-gray-500 dark:text-slate-400">
          Don't have an account? 
          <button (click)="switchToRegister.emit()" class="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Register</button>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  @Output() login = new EventEmitter<{ email: string; password: string }>();
  @Output() switchToRegister = new EventEmitter<void>();

  email = '';
  password = '';

  onSubmit() {
    if (this.email && this.password) {
      this.login.emit({ email: this.email, password: this.password });
    }
  }
}
