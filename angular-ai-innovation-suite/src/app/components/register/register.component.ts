import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div class="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-xl space-y-6">
        <div class="text-center space-y-2">
          <div class="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-xl font-bold mx-auto shadow-lg shadow-purple-500/30">
            <i class="fa-solid fa-user-plus"></i>
          </div>
          <h2 class="text-2xl font-extrabold text-gray-900 dark:text-slate-100">Create Account</h2>
          <p class="text-xs text-gray-500 dark:text-slate-400">Join the AI Innovation Suite platform</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Full Name</label>
            <input type="text" [(ngModel)]="name" name="name" required placeholder="John Doe" class="w-full bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-100 text-sm rounded-2xl px-4 py-3 border-none outline-none focus:ring-2 focus:ring-purple-500">
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Email Address</label>
            <input type="email" [(ngModel)]="email" name="email" required placeholder="user@example.com" class="w-full bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-100 text-sm rounded-2xl px-4 py-3 border-none outline-none focus:ring-2 focus:ring-purple-500">
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Password</label>
            <input type="password" [(ngModel)]="password" name="password" required placeholder="••••••••" class="w-full bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-100 text-sm rounded-2xl px-4 py-3 border-none outline-none focus:ring-2 focus:ring-purple-500">
          </div>

          <button type="submit" [disabled]="!name.trim() || !email.trim() || !password.trim()" class="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-sm transition-all shadow-md shadow-purple-500/20">
            Register Account
          </button>
        </form>

        <div class="text-center text-xs text-gray-500 dark:text-slate-400">
          Already have an account? 
          <button (click)="switchToLogin.emit()" class="text-purple-600 dark:text-purple-400 font-bold hover:underline">Sign In</button>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  @Output() register = new EventEmitter<{ name: string; email: string; password: string }>();
  @Output() switchToLogin = new EventEmitter<void>();

  name = '';
  email = '';
  password = '';

  onSubmit() {
    if (this.name && this.email && this.password) {
      this.register.emit({ name: this.name, email: this.email, password: this.password });
    }
  }
}
