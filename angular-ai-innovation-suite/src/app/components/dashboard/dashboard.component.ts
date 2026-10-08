import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-8 animate-fadeIn">
      <!-- Welcome Hero Banner -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-xl shadow-indigo-500/10">
        <div class="relative z-10 space-y-4 max-w-2xl">
          <span class="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide uppercase">
            {{ t('Next-Gen AI Portal') }}
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {{ t('Welcome Back') }}, {{ currentUser?.name || 'Explorer' }}!
          </h2>
          <p class="text-indigo-100 text-sm sm:text-base leading-relaxed">
            {{ t('Access high-performance neural modules for conversational intelligence, visual document analysis, and speech synthesis.') }}
          </p>
        </div>
      </div>

      <!-- Indian Languages Bar -->
      <div class="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-language text-indigo-500 text-xl"></i>
            <h3 class="font-bold text-gray-800 dark:text-slate-100">{{ t('Indian State Languages UI Localizer') }}</h3>
          </div>
          <span class="text-xs px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 rounded-full font-medium">
            22 Scheduled Languages
          </span>
        </div>
        <p class="text-xs text-gray-500 dark:text-slate-400">
          {{ t('Select your preferred Indian state language to convert the entire application interface instantly:') }}
        </p>
        <div class="flex flex-wrap gap-2 pt-2">
          <button *ngFor="let lang of indianLanguages"
                  (click)="changeLanguage.emit(lang)"
                  [class]="selectedLanguage === lang ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'"
                  class="px-3 py-1.5 rounded-xl text-xs font-medium transition-all">
            {{ lang }}
          </button>
        </div>
      </div>

      <!-- Feature Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- AI Chat -->
        <div (click)="navigate.emit('chat')" class="group relative bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
          <div class="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-comments"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-800 dark:text-slate-100 mb-2">{{ t('AI Chat Assistant') }}</h3>
          <p class="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-4">
            {{ t('Interactive conversational model equipped with Google Search Grounding for accurate context-aware responses.') }}
          </p>
          <div class="flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 gap-1 group-hover:gap-2 transition-all">
            <span>{{ t('Launch Chat') }}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>

        <!-- Vision Analysis -->
        <div (click)="navigate.emit('vision')" class="group relative bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
          <div class="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-eye"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-800 dark:text-slate-100 mb-2">{{ t('Image Upload & Analysis') }}</h3>
          <p class="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-4">
            {{ t('Multimodal image reasoning engine. Upload photos or diagrams to inspect elements, read text, or ask questions.') }}
          </p>
          <div class="flex items-center text-xs font-bold text-purple-600 dark:text-purple-400 gap-1 group-hover:gap-2 transition-all">
            <span>{{ t('Open Vision Studio') }}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>

        <!-- Talk with Voice -->
        <div (click)="navigate.emit('voice')" class="group relative bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
          <div class="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-microphone-lines"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-800 dark:text-slate-100 mb-2">{{ t('Talk with Voice') }}</h3>
          <p class="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-4">
            {{ t('Voice synthesis studio with real-time audio waveform visualizers and text-to-speech audio generation.') }}
          </p>
          <div class="flex items-center text-xs font-bold text-pink-600 dark:text-pink-400 gap-1 group-hover:gap-2 transition-all">
            <span>{{ t('Start Voice Session') }}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  @Input() currentUser: any = null;
  @Input() selectedLanguage = 'English';
  @Input() translationsCache: Record<string, string> = {};
  @Input() indianLanguages: string[] = [];

  @Output() navigate = new EventEmitter<string>();
  @Output() changeLanguage = new EventEmitter<string>();

  t(text: string): string {
    return this.translationsCache[text] || text;
  }
}
