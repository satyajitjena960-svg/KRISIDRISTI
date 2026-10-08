import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './services/auth.service';
import { GeminiService } from './services/gemini.service';
import { VoiceRecognitionService } from './services/voice-recognition.service';

import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChatComponent } from './components/chat/chat.component';
import { VisionComponent } from './components/vision/vision.component';
import { VoiceComponent } from './components/voice/voice.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    DashboardComponent,
    ChatComponent,
    VisionComponent,
    VoiceComponent,
    LoginComponent,
    RegisterComponent
  ],
  template: `
    <div [class.dark]="isDarkMode()" class="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100">
      <app-navbar 
        [currentUser]="auth.currentUser()"
        [selectedLanguage]="selectedLanguage()"
        [isDarkMode]="isDarkMode()"
        [isListening]="voice.isListening"
        [indianLanguages]="indianLanguages"
        (navigate)="navigate($event)"
        (toggleTheme)="toggleTheme()"
        (toggleGlobalVoice)="toggleGlobalVoice()"
        (changeLanguage)="changeLanguage($event)"
        (logout)="auth.logout()">
      </app-navbar>

      <main class="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <!-- Unauthenticated View -->
        <ng-container *ngIf="!auth.currentUser()">
          <app-login *ngIf="authMode === 'login'" (login)="onLogin($event)" (switchToRegister)="authMode = 'register'"></app-login>
          <app-register *ngIf="authMode === 'register'" (register)="onRegister($event)" (switchToLogin)="authMode = 'login'"></app-register>
        </ng-container>

        <!-- Authenticated Portal View -->
        <ng-container *ngIf="auth.currentUser()">
          <app-dashboard *ngIf="currentRoute() === 'dashboard'" 
            [currentUser]="auth.currentUser()" 
            [selectedLanguage]="selectedLanguage()"
            [translationsCache]="translationsCache()"
            [indianLanguages]="indianLanguages"
            (navigate)="navigate($event)"
            (changeLanguage)="changeLanguage($event)">
          </app-dashboard>

          <app-chat *ngIf="currentRoute() === 'chat'" [translationsCache]="translationsCache()"></app-chat>

          <app-vision *ngIf="currentRoute() === 'vision'" [translationsCache]="translationsCache()"></app-vision>

          <app-voice *ngIf="currentRoute() === 'voice'" [translationsCache]="translationsCache()"></app-voice>
        </ng-container>
      </main>
    </div>
  `
})
export class AppComponent {
  authMode: 'login' | 'register' = 'login';
  currentRoute = signal<string>('dashboard');
  selectedLanguage = signal<string>('English');
  isDarkMode = signal<boolean>(true);
  translationsCache = signal<Record<string, string>>({});

  indianLanguages = [
    'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Urdu', 'Gujarati', 
    'Kannada', 'Odia', 'Malayalam', 'Punjabi', 'Assamese', 'Maithili', 'Santali', 
    'Kashmiri', 'Nepali', 'Konkani', 'Dogri', 'Manipuri', 'Bodo', 'Sanskrit', 'Sindhi'
  ];

  constructor(
    public auth: AuthService,
    private gemini: GeminiService,
    public voice: VoiceRecognitionService
  ) {
    this.voice.onCommand.subscribe(cmd => this.navigate(cmd));
  }

  navigate(route: string) {
    this.currentRoute.set(route);
  }

  toggleTheme() {
    this.isDarkMode.update(v => !v);
  }

  toggleGlobalVoice() {
    this.voice.toggleListening();
  }

  async changeLanguage(lang: string) {
    this.selectedLanguage.set(lang);
    if (lang === 'English') {
      this.translationsCache.set({});
      return;
    }

    const phrases = [
      'Next-Gen AI Portal', 'Welcome Back', 'Access high-performance neural modules for conversational intelligence, visual document analysis, and speech synthesis.',
      'Indian State Languages UI Localizer', 'Select your preferred Indian state language to convert the entire application interface instantly:',
      'AI Chat Assistant', 'Interactive conversational model equipped with Google Search Grounding for accurate context-aware responses.', 'Launch Chat',
      'Image Upload & Analysis', 'Multimodal image reasoning engine. Upload photos or diagrams to inspect elements, read text, or ask questions.', 'Open Vision Studio',
      'Talk with Voice', 'Voice synthesis studio with real-time audio waveform visualizers and text-to-speech audio generation.', 'Start Voice Session',
      'Thinking...', 'Send', 'Ask anything...', 'Image Analysis Studio', 'Upload or drag and drop any image to run visual reasoning, object detection, or extract text.',
      'Click to upload image', 'Run Visual Analysis', 'Analyzing...', 'Analysis Insights', 'Upload an image and click analyze to see results.',
      'Speech-to-speech interaction engine. Synthesize natural human voices and test speech inputs.', 'Enter text to speak...', 'Synthesize & Speak', 'Speaking...'
    ];

    const translations = await this.gemini.translateBatch(phrases, lang);
    this.translationsCache.set(translations);
  }

  onLogin(event: { email: string; password: string }) {
    this.auth.login(event.email);
    this.navigate('dashboard');
  }

  onRegister(event: { name: string; email: string; password: string }) {
    this.auth.register(event.name, event.email);
    this.navigate('dashboard');
  }
}
