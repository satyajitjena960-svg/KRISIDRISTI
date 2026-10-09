import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageSwitcherComponent],
  template: `
    <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          
          <!-- Logo & Brand -->
          <a routerLink="/dashboard" class="flex items-center gap-2.5 group">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-green-600/20 group-hover:scale-105 transition-transform">
              <span class="text-2xl">🌾</span>
            </div>
            <div>
              <span class="text-xl font-black bg-gradient-to-r from-emerald-800 to-green-600 bg-clip-text text-transparent">कृषि साथी</span>
              <span class="block text-[10px] font-bold uppercase tracking-wider text-emerald-700">KrishiSathi Platform</span>
            </div>
          </a>

          <!-- Navigation Links -->
          @if (authService.isLoggedIn()) {
            <nav class="hidden md:flex items-center gap-1.5 font-semibold text-sm">
              <a routerLink="/dashboard" routerLinkActive="bg-emerald-50 text-emerald-800 border-emerald-400" [routerLinkActiveOptions]="{exact: true}"
                class="px-3.5 py-2 rounded-lg text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 border border-transparent transition-all flex items-center gap-1.5">
                <span>🏠</span> डैशबोर्ड
              </a>
              <a routerLink="/weather" routerLinkActive="bg-emerald-50 text-emerald-800 border-emerald-400"
                class="px-3.5 py-2 rounded-lg text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 border border-transparent transition-all flex items-center gap-1.5">
                <span>🌦️</span> मौसम (Weather)
              </a>
              <a routerLink="/crop" routerLinkActive="bg-emerald-50 text-emerald-800 border-emerald-400"
                class="px-3.5 py-2 rounded-lg text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 border border-transparent transition-all flex items-center gap-1.5">
                <span>🌱</span> फसल गाइड (Crops)
              </a>
              <a routerLink="/disease-detect" routerLinkActive="bg-emerald-50 text-emerald-800 border-emerald-400"
                class="px-3.5 py-2 rounded-lg text-rose-800 hover:text-rose-900 hover:bg-rose-50/60 border border-transparent transition-all flex items-center gap-1.5">
                <span>🩺</span> फसल डॉक्टर (AI Doctor)
              </a>
              <a routerLink="/rental" routerLinkActive="bg-emerald-50 text-emerald-800 border-emerald-400"
                class="px-3.5 py-2 rounded-lg text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 border border-transparent transition-all flex items-center gap-1.5">
                <span>🚜</span> उपकरण किराया (Rental)
              </a>
            </nav>
          }

          <!-- Language Selector & User Info & Action -->
          <div class="flex items-center gap-2 sm:gap-3">
            <!-- Google Translator Language Switcher -->
            <app-language-switcher></app-language-switcher>

            @if (authService.isLoggedIn()) {
              <div class="hidden sm:flex flex-col text-right">
                <span class="text-xs font-bold text-slate-800">{{ authService.currentUser()?.fullName }}</span>
                <span class="text-[10px] text-emerald-600 font-medium">📍 किसान मित्र (Farmer)</span>
              </div>
              <button
                (click)="authService.logout()"
                class="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors">
                लॉगआउट
              </button>
            } @else {
              <a routerLink="/login" class="px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all">
                लॉगिन करें
              </a>
            }
          </div>

        </div>
      </div>
    </header>
  `
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}
}
