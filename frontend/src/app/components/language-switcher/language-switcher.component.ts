import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, SupportedLanguage } from '../../services/translation.service';
import { AudioGuideService } from '../../services/audio-guide.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block text-left">
      <!-- Language Button -->
      <button
        type="button"
        (click)="toggle($event)"
        class="inline-flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-bold text-slate-700 bg-white/90 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl border border-slate-200/80 shadow-sm hover:shadow transition-all group"
        [attr.aria-expanded]="translationService.isDropdownOpen()"
        aria-haspopup="true">
        <span class="text-base group-hover:scale-110 transition-transform">🌐</span>
        <span class="hidden sm:inline font-semibold text-slate-500">भाषा:</span>
        <span class="flex items-center gap-1 font-black text-emerald-800">
          <span>{{ currentLang.flag }}</span>
          <span>{{ currentLang.name }}</span>
        </span>
        <svg class="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 transition-transform" [class.rotate-180]="translationService.isDropdownOpen()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Dropdown Menu -->
      @if (translationService.isDropdownOpen()) {
        <div
          class="origin-top-right absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl shadow-2xl bg-white border border-emerald-100 ring-1 ring-black/5 divide-y divide-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          <!-- Header -->
          <div class="px-4 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white flex items-center justify-between">
            <div>
              <p class="text-xs font-black uppercase tracking-wider text-emerald-100">Google Translator</p>
              <p class="text-sm font-bold">अपनी भाषा चुनें (Select Language)</p>
            </div>
            <span class="text-xl">🗣️</span>
          </div>

          <!-- Language Grid -->
          <div class="p-2 grid grid-cols-2 gap-1.5 max-h-72 overflow-y-auto">
            @for (lang of translationService.languages; track lang.code) {
              <button
                type="button"
                (click)="selectLanguage(lang)"
                class="flex items-center justify-between p-2.5 rounded-xl text-left transition-all text-xs font-semibold"
                [ngClass]="{
                  'bg-emerald-100/70 text-emerald-900 border border-emerald-300 font-black shadow-sm': translationService.currentLang() === lang.code,
                  'hover:bg-slate-100 text-slate-800': translationService.currentLang() !== lang.code
                }">
                <div class="flex items-center gap-2">
                  <span class="text-base">{{ lang.flag }}</span>
                  <div>
                    <div class="leading-tight">{{ lang.name }}</div>
                    <div class="text-[10px] text-slate-500 font-medium">{{ lang.englishName }}</div>
                  </div>
                </div>
                @if (translationService.currentLang() === lang.code) {
                  <span class="text-emerald-600 text-sm font-black">✓</span>
                }
              </button>
            }
          </div>

          <!-- Footer with Reset & Native Gadget -->
          <div class="p-2.5 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500">
            <button
              (click)="resetLanguage()"
              class="text-emerald-700 hover:text-emerald-900 font-bold hover:underline flex items-center gap-1">
              ↺ मूल भाषा (Reset to Hindi)
            </button>
            <span class="text-[10px] text-slate-400">Powered by Google</span>
          </div>

        </div>
      }
    </div>
  `
})
export class LanguageSwitcherComponent {

  constructor(
    public translationService: TranslationService,
    private audioGuide: AudioGuideService,
    private elementRef: ElementRef
  ) {}

  get currentLang(): SupportedLanguage {
    return this.translationService.getCurrentLanguage();
  }

  toggle(event: MouseEvent): void {
    event.stopPropagation();
    this.translationService.toggleDropdown();
  }

  selectLanguage(lang: SupportedLanguage): void {
    this.translationService.changeLanguage(lang.code);
    try {
      this.audioGuide.speak(`भाषा बदलकर ${lang.englishName} की गई`, 'hi-IN');
    } catch (e) {
      // audio feedback optional
    }
  }

  resetLanguage(): void {
    this.translationService.resetToDefault();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.translationService.closeDropdown();
    }
  }
}
