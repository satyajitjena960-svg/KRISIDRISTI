import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 sticky top-0 z-40 px-4 lg:px-8 py-3 flex items-center justify-between shadow-sm">
      <div class="flex items-center gap-3 cursor-pointer" (click)="navigate.emit('dashboard')">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30">
          <i class="fa-solid fa-brain"></i>
        </div>
        <div>
          <h1 class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400">
            AI Innovation Suite
          </h1>
          <span class="text-xs text-gray-500 dark:text-slate-400 hidden sm:inline-block">Multi-Modal Intelligence Portal</span>
        </div>
      </div>

      <div class="flex items-center gap-2 sm:gap-4">
        <!-- Voice Command Toggle -->
        <button (click)="toggleGlobalVoice.emit()" 
                [class]="isListening ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600'"
                class="px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2">
          <i class="fa-solid" [class.fa-microphone]="isListening" [class.fa-microphone-slash]="!isListening"></i>
          <span class="hidden md:inline">{{ isListening ? 'Voice Control Active' : 'Voice Assistant' }}</span>
        </button>

        <!-- Language Selector -->
        <select (change)="onLangChange($event)" 
                [value]="selectedLanguage"
                class="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 text-xs font-semibold rounded-xl px-3 py-1.5 border-none outline-none focus:ring-2 focus:ring-indigo-500">
          <option *ngFor="let lang of indianLanguages" [value]="lang">{{ lang }}</option>
        </select>

        <!-- Dark Mode Toggle -->
        <button (click)="toggleTheme.emit()" class="p-2 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
          <i class="fa-solid" [class.fa-sun]="isDarkMode" [class.fa-moon]="!isDarkMode"></i>
        </button>

        <!-- User Profile / Logout -->
        <div *ngIf="currentUser" class="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-slate-700">
          <div class="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-xs">
            {{ currentUser.name.charAt(0) }}
          </div>
          <span class="text-xs font-medium hidden lg:inline">{{ currentUser.name }}</span>
          <button (click)="logout.emit()" class="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Logout">
            <i class="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </div>
    </header>
  `
})
export class NavbarComponent {
  @Input() currentUser: any = null;
  @Input() selectedLanguage = 'English';
  @Input() isDarkMode = false;
  @Input() isListening = false;
  @Input() indianLanguages: string[] = [];

  @Output() navigate = new EventEmitter<string>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleGlobalVoice = new EventEmitter<void>();
  @Output() changeLanguage = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();

  onLangChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.changeLanguage.emit(val);
  }
}
