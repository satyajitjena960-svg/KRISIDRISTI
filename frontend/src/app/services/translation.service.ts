import { Injectable, signal } from '@angular/core';

export interface SupportedLanguage {
  code: string;
  name: string;
  englishName: string;
  flag: string;
  speechCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  readonly languages: SupportedLanguage[] = [
    { code: 'hi', name: 'हिन्दी', englishName: 'Hindi', flag: '🇮🇳', speechCode: 'hi-IN' },
    { code: 'en', name: 'English', englishName: 'English', flag: '🇬🇧', speechCode: 'en-IN' },
    { code: 'or', name: 'ଓଡ଼ିଆ', englishName: 'Odia', flag: '🇮🇳', speechCode: 'hi-IN' },
    { code: 'bn', name: 'বাংলা', englishName: 'Bengali', flag: '🇮🇳', speechCode: 'bn-IN' },
    { code: 'mr', name: 'मराठी', englishName: 'Marathi', flag: '🇮🇳', speechCode: 'mr-IN' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', englishName: 'Punjabi', flag: '🇮🇳', speechCode: 'pa-IN' },
    { code: 'te', name: 'తెలుగు', englishName: 'Telugu', flag: '🇮🇳', speechCode: 'te-IN' },
    { code: 'ta', name: 'தமிழ்', englishName: 'Tamil', flag: '🇮🇳', speechCode: 'ta-IN' },
    { code: 'gu', name: 'ગુજરાતી', englishName: 'Gujarati', flag: '🇮🇳', speechCode: 'gu-IN' },
    { code: 'kn', name: 'ಕನ್ನಡ', englishName: 'Kannada', flag: '🇮🇳', speechCode: 'kn-IN' }
  ];

  currentLang = signal<string>('hi');
  isDropdownOpen = signal<boolean>(false);

  constructor() {
    this.initLanguage();
  }

  initLanguage(): void {
    if (typeof window === 'undefined') return;

    // 1. Check saved language from localStorage
    const saved = localStorage.getItem('krishi_selected_lang');
    if (saved && this.languages.some(l => l.code === saved)) {
      this.currentLang.set(saved);
      return;
    }

    // 2. Check googtrans cookie
    const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
    if (match && match[1]) {
      const code = match[1];
      if (this.languages.some(l => l.code === code)) {
        this.currentLang.set(code);
      }
    }
  }

  getCurrentLanguage(): SupportedLanguage {
    return this.languages.find(l => l.code === this.currentLang()) || this.languages[0];
  }

  toggleDropdown(): void {
    this.isDropdownOpen.update(v => !v);
  }

  closeDropdown(): void {
    this.isDropdownOpen.set(false);
  }

  changeLanguage(langCode: string): void {
    if (typeof window === 'undefined') return;

    this.currentLang.set(langCode);
    localStorage.setItem('krishi_selected_lang', langCode);
    this.closeDropdown();

    // 1. Set Google Translate Cookie (for path and hostname)
    const hostname = window.location.hostname;
    document.cookie = `googtrans=/auto/${langCode}; path=/;`;
    if (hostname && hostname !== 'localhost') {
      document.cookie = `googtrans=/auto/${langCode}; domain=${hostname}; path=/;`;
    }

    // 2. Try to manipulate Google Translate Select element in DOM
    const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      // If combo not rendered yet, reloading activates the cookie translation
      window.location.reload();
    }
  }

  resetToDefault(): void {
    this.changeLanguage('hi');
  }
}
